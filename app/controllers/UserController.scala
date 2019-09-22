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
      Ok(Json.toJson(user)).withHeaders(
        "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
        , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
        , "Access-Control-Allow-Credentials" -> "true"
      )
    }
  }

  def getUsers = silhouette.SecuredAction.async { implicit request =>
    userRepository.list().map { users =>
      Ok(Json.toJson(users)).withHeaders(
        "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
        , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
        , "Access-Control-Allow-Credentials" -> "true"
      )
    }
  }

  def getById(idProvider: String) = Action.async { implicit request =>
    userRepository.getByProvider(idProvider).map { user =>
      Ok(Json.toJson(user)).withHeaders(
        "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
        , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
        , "Access-Control-Allow-Credentials" -> "true"
      )
    }
  }

}