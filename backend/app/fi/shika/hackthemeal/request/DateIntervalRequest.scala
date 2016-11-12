package fi.shika.hackthemeal.request

import org.joda.time.DateTime

/**
  * Created by ashikov on 12/11/2016.
  */
case class DateIntervalRequest(
  start : DateTime,
  end   : DateTime
)
