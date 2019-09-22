package models

import play.api.libs.json.Json

case class Order(id: Long, userId: Int, address: String, amount: Int)

object Order {
  implicit val orderFormat = Json.format[Order]
}

