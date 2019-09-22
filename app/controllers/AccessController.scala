package controllers

import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.api.i18n._
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.{ ExecutionContext, Future }
import scala.util.{ Failure, Success }

class AccessController @Inject() (cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def getAccess = Action { request =>
    val headers = request.headers.get("access-control-request-headers").orNull
    Ok("").withHeaders(
      "Access-Control-Allow-Origin" -> "*",
      "Access-Control-Allow-Methods" -> "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers" -> headers)

  }

  def getAccessLong(id: Long) = Action { request =>
    val headers = request.headers.get("access-control-request-headers").orNull
    Ok("").withHeaders(
      "Access-Control-Allow-Origin" -> "*",
      "Access-Control-Allow-Methods" -> "GET,POST,PUT,DELETE,OPTIONS")

  }

}
