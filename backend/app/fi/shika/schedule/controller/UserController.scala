package fi.shika.schedule.controller

import com.google.inject.Inject
import play.api.mvc.{Action, Controller}

import scala.concurrent.{ExecutionContext, Future}

class UserController @Inject()(implicit val ec: ExecutionContext) extends Controller {

  def getAll = Action.async { request =>
    Future(Ok("All users"))
  }
}
