package fi.shika.hackthemeal.persistence

import com.github.tototoshi.slick.PostgresJodaSupport._
import fi.shika.hackthemeal.persistence.model._
import fi.shika.hackthemeal.persistence.profile.SlickProfile
import org.joda.time.DateTime

/**
  * Created by ashikov on 10/08/16.
  */
trait TableComponent { self: SlickProfile =>

  import driver.api._

  protected abstract class BaseTable[T](tag: Tag, name: String) extends Table[T](tag, "hackthemeal_" + name) {
    def id = column[Option[Long]]("id", O.PrimaryKey)
  }

  protected class DinerTable(tag: Tag) extends BaseTable[Diner](tag, "diner") {
    def fname      = column[String]("fname", O.Default(""))
    def lname      = column[String]("lname", O.Default(""))
    def energyneed = column[String]("energyneed", O.Default(""))
    def L          = column[Int]("L")
    def G          = column[Int]("G")
    def M          = column[Int]("M")
    def VL         = column[Int]("VL")
    def V          = column[Int]("V")

    def * = (id, fname, lname, energyneed, L, G, M, VL, V) <> (Diner.tupled, Diner.unapply)
  }

  protected class DishTable(tag: Tag) extends BaseTable[Dish](tag, "dish") {
    def dispname = column[String]("dispname")
    def energy   = column[Int]("energy")
    def protein  = column[Int]("protein")
    def fat      = column[Int]("fat")
    def carbon   = column[Int]("carbon")
    def L        = column[Int]("L")
    def G        = column[Int]("G")
    def M        = column[Int]("M")
    def VL       = column[Int]("VL")
    def V        = column[Int]("V")
    def status   = column[String]("status")

    def * = (id, dispname, energy, protein, fat, carbon, L, G, M, VL, V, status) <> (Dish.tupled, Dish.unapply)
  }

  protected class PortionTable(tag: Tag) extends BaseTable[Portion](tag, "portion") {
    def dinerId  = column[Option[Long]]("dinerId")
    def dishId   = column[Option[Long]]("dishId")
    def weight   = column[Int]("weight")
    def moment   = column[DateTime]("moment")
    def energy   = column[Float]("energy")
    def protein  = column[Float]("protein")
    def fat      = column[Float]("fat")
    def carbon   = column[Float]("carbon")
    def mealname = column[String]("mealname")

    def * = (id, dinerId, dishId, weight, moment, energy, protein, fat, carbon, mealname) <> (Portion.tupled, Portion.unapply)

    def dinerFK = foreignKey("dinerFK", dinerId, diners)(_.id, onUpdate=ForeignKeyAction.Restrict, onDelete=ForeignKeyAction.Cascade)
    def dishFK  = foreignKey("dishFK", dishId, dishes)(_.id, onUpdate=ForeignKeyAction.Restrict, onDelete=ForeignKeyAction.Cascade)
  }

  protected val diners = TableQuery[DinerTable]
  protected val dishes = TableQuery[DishTable]
  protected val portions = TableQuery[PortionTable]
}
