package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class OrderRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class OrderTable(tag: Tag) extends Table[Order](tag, "order") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    //    def order_date = column[String]("order_date")

    def userId = column[Int]("user_id")

    def address = column[String]("address")

    def amount = column[Int]("amount")

    def * = (id, userId, address, amount) <> ((Order.apply _).tupled, Order.unapply)
    //    def user = foreignKey("user_fk",userId, users)(_.id)
  }
  private val orders = TableQuery[OrderTable]
  //  private val users = TableQuery[PeopleTable]

  def create(userId: Int, address: String, amount: Int): Future[Order] = db.run {
    (orders.map(p => (p.userId, p.address, p.amount))
      returning orders.map(_.id)
      into { case ((userId, address, amount), id) => Order(id, userId, address, amount) }
    ) += ((userId, address, amount))
  }

  def list(): Future[Seq[Order]] = db.run {
    orders.result
  }

  def getOrdersByUser(userId: Int): Future[Seq[Order]] = db.run {
    orders.filter(_.userId === userId).result
  }

  def getOrder(id: Long) = db.run {
    orders.filter(_.id === id).result.headOption
  }

  def remove(id: Long) = db.run {
    orders.filter(_.id === id).delete
  }

}
