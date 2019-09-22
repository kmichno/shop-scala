package models.security

import org.joda.time.DateTime
import play.api.libs.json._

/**
 * This class represent token
 *
 * @param token Id of token
 */
case class Token(token: String)

/**
 * Companion object, contain format for Json
 */
object Token {

  implicit val restFormat = Json.format[Token]

}