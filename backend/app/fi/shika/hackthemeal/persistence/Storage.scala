package fi.shika.hackthemeal.persistence

import com.google.inject.{ImplementedBy, Inject}
import fi.shika.hackthemeal.persistence.model.{Diner, Dish, Portion}
import fi.shika.hackthemeal.persistence.profile.SlickProfile
import org.joda.time.DateTime
import play.api.db.slick.DatabaseConfigProvider

import scala.concurrent.{ExecutionContext, Future}

@ImplementedBy(classOf[StorageImpl])
trait Storage {
  def createDishes(dishesList: Seq[Dish]): Future[Seq[Dish]]

  def createDiners(dinersList: Seq[Diner]): Future[Seq[Diner]]

  def createPortions(portionsList: Seq[Portion]): Future[Seq[Portion]]

  def portionMoments: Future[Seq[DateTime]]

  def portionMoments(start: DateTime, end: DateTime): Future[Seq[DateTime]]

  def getDishHistory(start: DateTime, end: DateTime): Future[Seq[(Dish, DateTime, Int)]]

  def getMostTakenDishes(limit: Int): Future[Seq[(Dish, Int)]]

  def getMostTakenDishesPerWeekDay: Future[Seq[(Int, Dish, Int)]]

  def getStatisticsData(start: DateTime, end: DateTime): Future[(Seq[Portion], Seq[Diner], Seq[Dish])]
}

class StorageImpl @Inject()(val configProvider: DatabaseConfigProvider)(implicit val ec: ExecutionContext)
  extends Storage
  with TableComponent
  with SlickProfile {

  import driver.api._
  import com.github.tototoshi.slick.PostgresJodaSupport._

  def createDishes(dishesList: Seq[Dish]) = db.run(dishes returning dishes ++= dishesList)

  def createDiners(dinersList: Seq[Diner]) = db.run(diners returning diners ++= dinersList)

  def createPortions(portionsList: Seq[Portion]) = db.run(portions returning portions ++= portionsList)

  def portionMoments = db.run(portions.map(_.moment).result)

  def portionMoments(start: DateTime, end: DateTime) = db.run(
    portions.map(_.moment)
      .filter(it => it >= start && it <= end)
      .result)

  def getDishHistory(start: DateTime, end: DateTime) = {
    val query = portions.filter(it => it.moment >= start && it.moment <= end)
      .map(it => (it.dishId, it.moment))
      .result

    for {
      results    <- db.run(query)
      dishesList <- db.run(dishes.filter(_.id.inSet(results.map(_._1.get).distinct)).result)
    } yield dishesList.map(it => (
      it,
      results.filter(tuple => tuple._1 == it.id).head._2,
      results.count(tuple => tuple._1 == it.id))
    )
  }

  def getMostTakenDishes(limit: Int) = for {
    results <- db.run(portions.groupBy(_.dishId)
        .map { case (id, query) => (id, query.length) }
        .sortBy(_._2.desc)
        .take(limit)
        .result)
    dishes <- db.run(dishes.filter(_.id.inSet(results.map(_._1.get))).result)
  } yield dishes.map( it => (
      it,
      results.filter(_._1 == it.id).head._2
    )
  )

  def getMostTakenDishesPerWeekDay = for {
    results <- db.run(portions.map(it => (it.moment, it.dishId)).result)
    dishes  <- db.run(dishes.filter(_.id.inSet(getNeededFuckingSetPlease(results))).result)
  } yield results.groupBy(_._1.dayOfWeek().get)
    .map { case (day, res) =>
      (day, res.map(_._2)
        .groupBy(identity)
        .maxBy(_._2.size))
    }
    .toSeq
    .map(it => (it._1, dishes.filter(_.id == it._2._1).head, it._2._2.size))

  def getStatisticsData(start: DateTime, end: DateTime) = for {
    portionList <- db.run(portions.filter(it => it.moment >= start && it.moment <= end).result)
    dinerList   <- db.run(diners.filter(_.id.inSet(portionList.map(_.dinerid.get).distinct)).result)
    dishesList  <- db.run(dishes.filter(_.id.inSet(portionList.map(_.dishid.get).distinct)).result)
  } yield (portionList, dinerList, dishesList)

  private def getNeededFuckingSetPlease(results: Seq[(DateTime, Option[Long])]) =
    results.groupBy(_._1.dayOfWeek().get)
      .map { case (day, res) =>
        res.map(_._2)
          .groupBy(identity)
          .maxBy(_._2.size)
          ._1
      }
      .toSeq
      .map(_.get)
}
