package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class OrderedProductRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class OrderedProductTable(tag: Tag) extends Table[OrderedProduct](tag, "ordered_product") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def order_id = column[Int]("order_id")

    def product_id = column[Int]("product_id")

    def quantity = column[Int]("quantity")

    def * = (id, order_id, product_id, quantity) <> ((OrderedProduct.apply _).tupled, OrderedProduct.unapply)
    //    def user = foreignKey("user_fk",userId, users)(_.id)
  }
  private val orderedProducts = TableQuery[OrderedProductTable]
  //  private val users = TableQuery[PeopleTable]

  def create(order_id: Int, product_id: Int, quantity: Int): Future[OrderedProduct] = db.run {
    (orderedProducts.map(p => (p.order_id, p.product_id, p.quantity))
      returning orderedProducts.map(_.id)
      into ((nameAge, id) => OrderedProduct(id, nameAge._1, nameAge._2, nameAge._3))
    ) += ((order_id, product_id, quantity))
  }

  def list(): Future[Seq[OrderedProduct]] = db.run {
    orderedProducts.result
  }

  def getOrderedProductsByOrder(order_id: Int): Future[Seq[OrderedProduct]] = db.run {
    orderedProducts.filter(_.order_id === order_id).result
  }

  def getOrderedProduct(order_id: Int): Future[Seq[OrderedProduct]] = db.run {
    orderedProducts.filter(_.order_id === order_id).result
  }

  def remove(id: Long) = db.run {
    orderedProducts.filter(_.id === id).delete
  }

}
