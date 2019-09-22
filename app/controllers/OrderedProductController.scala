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

import scala.concurrent.duration.Duration
import scala.concurrent.{ Await, ExecutionContext, Future }

class OrderedProductController @Inject() (
  repo: OrderedProductRepository,
  cc: MessagesControllerComponents,
  silhouette: Silhouette[DefaultEnv]
)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def getOrderedProducts(order_id: Integer) = Action.async { implicit request =>
    repo.getOrderedProduct(order_id).map(order =>
      Ok(Json.toJson(order)).withHeaders(
        "Access-Control-Allow-Origin" -> "*")
    )
  }

  def addOrderedProduct = Action { implicit request =>
    val order_id = request.body.asJson.get("order_id").as[Int]
    val product_id = request.body.asJson.get("product_id").as[Int]
    val quantity = request.body.asJson.get("quantity").as[Int]

    val orderedProduct = repo.create(order_id, product_id, quantity)

    Await.result(orderedProduct, Duration.Inf)
    var id = orderedProduct.value.get.get
    Ok(Json.toJson(id)).withHeaders(
      "Access-Control-Allow-Origin" -> "*")
  }

}
