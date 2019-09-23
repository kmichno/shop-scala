package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.api.i18n._
import play.api.libs.json.Json
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.{ ExecutionContext, Future }
import scala.util.{ Failure, Success }

class CategoryController @Inject() (categoryRepo: CategoryRepository, cc: MessagesControllerComponents, silhouette: Silhouette[DefaultEnv])(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def addCategory = silhouette.SecuredAction { implicit request =>
    val category_name = request.body.asJson.get("category_name").as[String]
    categoryRepo.create(category_name)
    Ok("Added category")
  }

  def editCategory(id: Long) = silhouette.SecuredAction { implicit request =>
    val category_name = request.body.asJson.get("category_name").as[String]

    categoryRepo.update(id, category_name).map { product =>
      Ok(Json.toJson(product))
    }

    Ok("Added category")
  }

  def getCategory(id: Long) = Action.async { implicit request =>
    categoryRepo.select(id).map { category =>
      Ok(Json.toJson(category.get))
    }
  }

  def getCategories = Action.async { implicit request =>
    categoryRepo.list().map { category =>
      Ok(Json.toJson(category))
    }
  }

  def deleteCategory(id: Long) = silhouette.SecuredAction.async { implicit request =>
    categoryRepo.delete(id).map { product =>
      Ok(Json.toJson(product))
    }
  }
}
