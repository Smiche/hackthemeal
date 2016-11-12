package fi.shika.hackthemeal.controller

import com.github.tototoshi.play2.json4s.Json4s
import com.google.inject.Inject
import fi.shika.hackthemeal.formats.JsonFormats
import fi.shika.hackthemeal.persistence.Storage
import fi.shika.hackthemeal.persistence.model.{Diner, Dish, Portion}
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
}
