package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import models._
import play.api.Logger
import play.api.libs.json.Json
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.duration.Duration
import scala.concurrent.{ Await, ExecutionContext, Future }

class OrderController @Inject() (
  repo: OrderRepository,
  cc: MessagesControllerComponents,
  silhouette: Silhouette[DefaultEnv]
)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {
  val logger = Logger("OrderController")

  def getOrders = Action.async { implicit request =>
    repo.list().map { orders =>
      Ok(Json.toJson(orders)).withHeaders(
        "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
        , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
        , "Access-Control-Allow-Credentials" -> "true"
      )
    }
  }

  def getOrdersByUser(user_id: Integer) = Action.async { implicit request =>
    repo.getOrdersByUser(user_id).map { orders =>
      Ok(Json.toJson(orders)).withHeaders(
        "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
        , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
        , "Access-Control-Allow-Credentials" -> "true"
      )
    }
  }

  def addOrder = Action { implicit request =>
    logger.debug("asdfasdfasdfasdfasdfasfsdafasdf")
    logger.warn("asdfasdfasdfasdfasdfasfsdafasdf")
    val user_id = request.body.asJson.get("user_id").as[Int]
    val address = request.body.asJson.get("address").as[String]
    val amount = request.body.asJson.get("amount").as[Int]
    logger.debug(user_id.toString())
    val order = repo.create(user_id, address, amount)

    Await.result(order, Duration.Inf)
    var createdOrder: Order = order.value.get.get
    Ok(Json.toJson(createdOrder)).withHeaders(
      "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
      , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
      , "Access-Control-Allow-Credentials" -> "true"
    )
  }

  def getOrder(id: Long) = Action.async { request =>
    repo.getOrder(id).map(order =>
      Ok(Json.toJson(order)).withHeaders(
        "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
        , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
        , "Access-Control-Allow-Credentials" -> "true"
      )
    )
  }

  def delete(id: Long) = Action.async { request =>
    repo.remove(id).map { basket =>
      Ok(Json.toJson(basket)) withHeaders (
        "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
        , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
        , "Access-Control-Allow-Credentials" -> "true"
      )
    }
  }
}

case class CreateOrderForm(order_date: String, userId: Int)