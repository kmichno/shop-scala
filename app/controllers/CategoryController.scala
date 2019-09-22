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

class CategoryController @Inject() (categoryRepo: CategoryRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def addCategory = Action { implicit request =>
    val category_name = request.body.asJson.get("category_name").as[String]
    categoryRepo.create(category_name)
    Ok("Added category").withHeaders(
      "Access-Control-Allow-Origin" -> "*")
  }

  def getCategories = Action.async { implicit request =>
    categoryRepo.list().map { category =>
      Ok(Json.toJson(category)).withHeaders(
        "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
        , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
        , "Access-Control-Allow-Credentials" -> "true"
      )
    }
  }
}
