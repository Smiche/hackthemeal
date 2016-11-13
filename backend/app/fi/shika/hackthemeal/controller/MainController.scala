package fi.shika.hackthemeal.controller

import java.util.Date

import com.github.tototoshi.play2.json4s.Json4s
import com.google.inject.Inject
import fi.shika.hackthemeal.formats.JsonFormats
import fi.shika.hackthemeal.persistence.Storage
import fi.shika.hackthemeal.persistence.model.{Diner, Dish, Portion}
import fi.shika.hackthemeal.processor.StatisticsProcessor
import fi.shika.hackthemeal.request.DateIntervalRequest
import org.joda.time.DateTime
import org.json4s._
import org.json4s.ext.JodaTimeSerializers
import play.api.mvc.{Action, Controller}

import scala.collection.mutable
import scala.concurrent.ExecutionContext

class MainController @Inject()(
  val storage: Storage,
  json4s: Json4s,
  val processor: StatisticsProcessor
)(
  implicit val ec: ExecutionContext
) extends Controller {

  import json4s._

  implicit val defaultFormats = JsonFormats ++ JodaTimeSerializers.all

  def createDishes = Action.async(json) { implicit request =>
    storage.createDishes(request.body.extract[Seq[Dish]])
      .map (s => Ok(s"Created ${s.size}"))
  }

  def createDiners = Action.async(json) { implicit request =>
    storage.createDiners(request.body.extract[Seq[Diner]])
      .map (s => Ok(s"Created ${s.size}"))
  }

  def createPortions = Action.async(json) { implicit request =>
    storage.createPortions(request.body.extract[Seq[Portion]])
      .map (s => Ok(s"Created ${s.size}"))
  }

  def getPortionMoments = Action.async { implicit request =>
    storage.portionMoments.map { moments =>
      val result = (1 to 7).map { dayToCount =>
        moments.count(_.dayOfWeek().get() == dayToCount)
      }
      Ok(Extraction.decompose(result))
    }
  }

  def getPortionDates = Action.async(json) { implicit request =>
    val data = request.body.extract[DateIntervalRequest]
    storage.portionMoments(data.start, data.end).map { moments =>
      val result = moments.groupBy(_.toLocalDate.toDate.getTime)
        .map { it => new Date(it._1) -> it._2.size }
      Ok(Extraction.decompose(result))
    }
  }

  def getDishHistory = Action.async(json) { implicit request =>
    val data = request.body.extract[DateIntervalRequest]
    storage.getDishHistory(data.start, data.end).map { dishes =>
      val result = dishes.map {
        case (dish, date, count) =>
          Map(
            "dish" -> dish,
            "date" -> date,
            "count" -> count
          )
      }
      Ok(Extraction.decompose(result))
    }
  }

  def getMostTakenDishes(limit: Int) = Action.async { implicit request =>
    storage.getMostTakenDishes(limit).map { dishes =>
      val result = dishes.sortBy(-_._2).map {
        case (dish, count) =>
          Map(
            "dish" -> dish,
            "count" -> count
          )
      }
      Ok(Extraction.decompose(result))
    }
  }

  def getMostTakenDishPerDay = Action.async { implicit request =>
    storage.getMostTakenDishesPerWeekDay.map { results =>
      val repacked = results.sortBy(_._1).map {
        case (weekDay, dish, count) =>
          Map(
            "day" -> weekDay,
            "dish" -> dish,
            "count" -> count
          )
      }
      Ok(Extraction.decompose(repacked))
    }
  }

  def getStatistics(timestamp: Long) = Action.async { implicit request =>
    val end = new DateTime(timestamp)
    val start = end.minusMonths(1)

    storage.getStatisticsData(start, end).map { case (portions, diners, dishes) =>

      val mostLikedLastMonth = processor.provideMostLiked(portions)
      val mostLikedForDay = processor.provideMostLikedInDay(portions, end)
      val dietScores = processor.provideDietScores(diners)
      val dietDishes = processor.provideDietPortions(dishes)
      val bestDiners = processor.provideDinersForWeekDay(portions, diners, end)
      val preferredDishes = processor.providePreferredDishes(portions, bestDiners)

      val FirstStepValue  = 1.0
      val SecondStepValue = 1.7
      val ThirdStepValue  = 1.4
      val ForthStepValue  = 1.9

      val scores = mutable.Map[Long, Double]()
      dishes.map(it => (it.id.get, 0.0)).foreach(scores += _)

      def addScore(seq: Seq[Long], coeff: Double) {
        seq.zipWithIndex
          .map { case (id, count) => (id, scores(id) + (seq.size - count) * coeff) }
          .foreach { scores += _ }
      }
      addScore(mostLikedLastMonth, FirstStepValue)
      addScore(mostLikedForDay, SecondStepValue)
      addScore(preferredDishes, ForthStepValue)

      dietDishes.L.map { id => (id, scores(id) + dietScores("L") * ThirdStepValue) }.foreach { scores += _ }
      dietDishes.G.map { id => (id, scores(id) + dietScores("G") * ThirdStepValue) }.foreach { scores += _ }
      dietDishes.M.map { id => (id, scores(id) + dietScores("M") * ThirdStepValue) }.foreach { scores += _ }
      dietDishes.V.map { id => (id, scores(id) + dietScores("V") * ThirdStepValue) }.foreach { scores += _ }
      dietDishes.VL.map { id => (id, scores(id) + dietScores("VL") * ThirdStepValue) }.foreach { scores += _ }

      val result = scores.toSeq.sortBy(-_._2)
        .map { case (id, score) => Map(
            "dish" -> dishes.filter(_.id.get == id).head,
            "score" -> score
          )
        }

      Ok(Extraction.decompose(result))
    }
  }
}
