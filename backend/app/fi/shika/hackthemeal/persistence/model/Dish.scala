package fi.shika.hackthemeal.persistence.model


case class Dish(
  id       : Option[Long],
  dispname : String,
  energy   : Int,
  protein  : Int,
  fat      : Int,
  carbon   : Int,
  L        : Int,
  G        : Int,
  M        : Int,
  VL       : Int,
  V        : Int,
  status   : String)
