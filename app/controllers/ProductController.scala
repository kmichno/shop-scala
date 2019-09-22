package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject._
import models._
import play.api.libs.json.Json
import play.api.mvc._
import utils.auth.{ DefaultEnv, WithProvider }

import scala.concurrent.{ ExecutionContext, Future }

class ProductController @Inject() (
  productsRepo: ProductRepository,
  cc: MessagesControllerComponents, silhouette: Silhouette[DefaultEnv])(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def addProduct = silhouette.SecuredAction { implicit request =>
    val product_name = request.body.asJson.get("product_name").as[String]
    val product_description = request.body.asJson.get("product_description").as[String]
    val product_category = request.body.asJson.get("product_category").as[Int]
    val product_price = request.body.asJson.get("product_price").as[Int]

    productsRepo.create(product_name, product_description, product_category, product_price)
    Ok("Added product").withHeaders(
      "Access-Control-Allow-Origin" -> "*")
  }

  def getProducts = Action.async { implicit request =>
    productsRepo.list().map { products =>
      Ok(Json.toJson(products)).withHeaders(
        "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
        , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
        , "Access-Control-Allow-Credentials" -> "true"
      )
    }
  }

  def getProduct(id: Long) = Action.async { implicit request =>
    productsRepo.select(id).map { product =>
      Ok(Json.toJson(product.get)).withHeaders(
        "Access-Control-Allow-Origin" -> "http://localhost:3000", "Access-Control-Allow-Methods" -> "OPTIONS, GET, POST, PUT, DELETE, HEAD" // OPTIONS for pre-flight
        , "Access-Control-Allow-Headers" -> "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With" //, "X-My-NonStd-Option"
        , "Access-Control-Allow-Credentials" -> "true"
      )
    }
  }

  def editProduct(id: Long) = Action.async { implicit request =>
    val product_name = request.body.asJson.get("product_name").as[String]
    val product_description = request.body.asJson.get("product_description").as[String]
    val product_category = request.body.asJson.get("product_category").as[Int]
    val product_price = request.body.asJson.get("product_price").as[Int]

    productsRepo.update(id, product_name, product_description, product_category, product_price).map { product =>
      Ok(Json.toJson(product)).withHeaders(
        "Access-Control-Allow-Origin" -> "*")
    }
  }

  def deleteProduct(id: Long) = Action.async { implicit request =>
    productsRepo.delete(id).map { product =>
      Ok(Json.toJson(product)).withHeaders(
        "Access-Control-Allow-Origin" -> "*")
    }
  }
}