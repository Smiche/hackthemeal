package fi.shika.hackthemeal.persistence.model


case class Diner(
  id         : Option[Long],
  fname      : String,
  lname      : String,
  energyneed : String,
  L          : Int,
  G          : Int,
  M          : Int,
  VL         : Int,
  V          : Int
)
