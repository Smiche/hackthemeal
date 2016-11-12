package fi.shika.schedule.persistence

import com.github.tototoshi.slick.PostgresJodaSupport._
import fi.shika.schedule.persistence.model._
import fi.shika.schedule.persistence.profile.SlickProfile
import org.joda.time.DateTime

/**
  * Created by ashikov on 10/08/16.
  */
trait TableComponent { self: SlickProfile =>

  import driver.api._

  protected abstract class BaseTable[T](tag: Tag, name: String) extends Table[T](tag, "sch_" + name) {
    def id = column[Option[Long]]("id", O.PrimaryKey, O.AutoInc)
  }

  protected class EventTable(tag: Tag) extends BaseTable[Event](tag, "event") {
    def name        = column[String]("name")
    def description = column[String]("description")
    def start       = column[DateTime]("start")
    def end         = column[DateTime]("end")
    def modified    = column[DateTime]("modified")
    def eventType   = column[String]("event_type")

    def * = (id, name, description, start, end, modified, eventType) <> (Event.tupled, Event.unapply)
  }

  protected val events = TableQuery[EventTable]

  implicit val stringListMapper = MappedColumnType.base[Seq[String],String](
    list   => list.mkString(","),
    string => string.split(',').toList.filter(_.nonEmpty)
  )
}
