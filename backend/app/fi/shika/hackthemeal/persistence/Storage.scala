package fi.shika.hackthemeal.persistence

import com.google.inject.{ImplementedBy, Inject}
import fi.shika.hackthemeal.persistence.model.{Diner, Dish, Portion}
import fi.shika.hackthemeal.persistence.profile.SlickProfile
import play.api.db.slick.DatabaseConfigProvider

import scala.concurrent.Future

@ImplementedBy(classOf[StorageImpl])
trait Storage {
  def createDishes(dishesList: Seq[Dish]): Future[Seq[Dish]]

  def createDiners(dinersList: Seq[Diner]): Future[Seq[Diner]]

  def createPortions(portionsList: Seq[Portion]): Future[Seq[Portion]]
}

class StorageImpl @Inject()(val configProvider: DatabaseConfigProvider) extends Storage
  with TableComponent
  with SlickProfile {

  import driver.api._

  def createDishes(dishesList: Seq[Dish]) = db.run(dishes returning dishes ++= dishesList)

  def createDiners(dinersList: Seq[Diner]) = db.run(diners returning diners ++= dinersList)

  def createPortions(portionsList: Seq[Portion]) = db.run(portions returning portions ++= portionsList)
}
