package fi.shika.hackthemeal.persistence.model

import org.joda.time.DateTime

case class Portion(
  id       : Option[Long],
  dinerid  : Option[Long],
  dishid   : Option[Long],
  weight   : Int,
  moment   : DateTime,
  energy   : Float,
  protein  : Float,
  fat      : Float,
  carbon   : Float,
  mealname : String)
