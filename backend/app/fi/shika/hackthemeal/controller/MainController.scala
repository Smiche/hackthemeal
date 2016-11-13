package fi.shika.hackthemeal.controller

import java.util.Date

import com.github.tototoshi.play2.json4s.Json4s
import com.google.inject.Inject
import fi.shika.hackthemeal.formats.JsonFormats
import fi.shika.hackthemeal.persistence.Storage
import fi.shika.hackthemeal.persistence.model.{Diner, Dish, Portion}
import fi.shika.hackthemeal.request.DateIntervalRequest
import org.json4s._
import org.json4s.ext.JodaTimeSerializers
import play.api.Logger
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext

class MainController @Inject()(val storage: Storage, json4s: Json4s)(implicit val ec: ExecutionContext)
  extends Controller {

  import json4s._

  implicit val defaultFormats = JsonFormats ++ JodaTimeSerializers.all

  private val _log = Logger(getClass)

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
}
