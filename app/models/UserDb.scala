package models

import play.api.libs.json.Json

case class UserDb(id: Long, name: String, surname: String, email: String, idProvider: String)

object UserDb {
  implicit val userFormat = Json.format[UserDb]
}