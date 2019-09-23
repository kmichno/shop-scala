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
    Ok("Added product")
  }

  def getProducts = Action.async { implicit request =>
    productsRepo.list().map { products =>
      Ok(Json.toJson(products))
    }
  }

  def getProduct(id: Long) = Action.async { implicit request =>
    productsRepo.select(id).map { product =>
      Ok(Json.toJson(product.get))
    }
  }

  def editProduct(id: Long) = silhouette.SecuredAction.async { implicit request =>
    val product_name = request.body.asJson.get("product_name").as[String]
    val product_description = request.body.asJson.get("product_description").as[String]
    val product_category = request.body.asJson.get("product_category").as[Int]
    val product_price = request.body.asJson.get("product_price").as[Int]

    productsRepo.update(id, product_name, product_description, product_category, product_price).map { product =>
      Ok(Json.toJson(product))
    }
  }

  def deleteProduct(id: Long) = silhouette.SecuredAction.async { implicit request =>
    productsRepo.delete(id).map { product =>
      Ok(Json.toJson(product))
    }
  }
}