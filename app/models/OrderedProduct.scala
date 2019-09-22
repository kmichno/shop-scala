package models

import play.api.libs.json.Json

case class OrderedProduct(id: Long, order_id: Int, product_id: Int, quantity: Int)

object OrderedProduct {
  implicit val orderedProductFormat = Json.format[OrderedProduct]
}

