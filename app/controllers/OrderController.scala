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

  def getOrders = silhouette.SecuredAction.async { implicit request =>
    repo.list().map { orders =>
      Ok(Json.toJson(orders))
    }
  }

  def getOrdersByUser(user_id: Integer) = silhouette.SecuredAction.async { implicit request =>
    repo.getOrdersByUser(user_id).map { orders =>
      Ok(Json.toJson(orders))
    }
  }

  def addOrder = silhouette.SecuredAction { implicit request =>
    logger.debug("asdfasdfasdfasdfasdfasfsdafasdf")
    logger.warn("asdfasdfasdfasdfasdfasfsdafasdf")
    val user_id = request.body.asJson.get("user_id").as[Int]
    val address = request.body.asJson.get("address").as[String]
    val amount = request.body.asJson.get("amount").as[Int]
    logger.debug(user_id.toString())
    val order = repo.create(user_id, address, amount)

    Await.result(order, Duration.Inf)
    var createdOrder: Order = order.value.get.get
    Ok(Json.toJson(createdOrder))
  }

  def getOrder(id: Long) = silhouette.SecuredAction.async { request =>
    repo.getOrder(id).map(order =>
      Ok(Json.toJson(order))
    )
  }

  def delete(id: Long) = silhouette.SecuredAction.async { request =>
    repo.remove(id).map { basket =>
      Ok(Json.toJson(basket))
    }
  }
}

case class CreateOrderForm(order_date: String, userId: Int)