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
}
