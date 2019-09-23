package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import models._
import play.api.libs.json.Json
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.ExecutionContext

class UserController @Inject() (
  userRepository: UserRepository,
  cc: MessagesControllerComponents, silhouette: Silhouette[DefaultEnv])(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def getUser() = silhouette.SecuredAction { implicit request =>
    Ok(Json.toJson(request.identity))
  }

  def deleteUser(id: Long) = silhouette.SecuredAction.async { implicit request =>
    userRepository.delete(id).map { user =>
      Ok(Json.toJson(user))
    }
  }

  def getUsers = silhouette.SecuredAction.async { implicit request =>
    userRepository.list().map { users =>
      Ok(Json.toJson(users))
    }
  }

  def getById(idProvider: String) = silhouette.SecuredAction.async { implicit request =>
    userRepository.getByProvider(idProvider).map { user =>
      Ok(Json.toJson(user))
    }
  }

}