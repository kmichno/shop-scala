package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ Future, ExecutionContext }

/**
 * A repository for people.
 *
 * @param dbConfigProvider The Play db config provider. Play will inject this for you.
 */
@Singleton
class CategoryRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  // We want the JdbcProfile for this provider
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import profile.api._

  /**
   * Here we define the table. It will have a name of people
   */
  class CategoryTable(tag: Tag) extends Table[Category](tag, "category") {

    /** The ID column, which is the primary key, and auto incremented */
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    /** The name column */
    def name = column[String]("name")

    /**
     * This is the tables default "projection".
     *
     * It defines how the columns are converted to and from the Person object.
     *
     * In this case, we are simply passing the id, name and page parameters to the Person case classes
     * apply and unapply methods.
     */
    def * = (id, name) <> ((Category.apply _).tupled, Category.unapply)
  }

  /**
   * The starting point for all queries on the people table.
   */
  private val category = TableQuery[CategoryTable]

  /**
   * Create a person with the given name and age.
   *
   * This is an asynchronous operation, it will return a future of the created person, which can be used to obtain the
   * id for that person.
   */
  def create(name: String): Future[Category] = db.run {
    // We create a projection of just the name and age columns, since we're not inserting a value for the id column
    (category.map(c => (c.name))
      // Now define it to return the id, because we want to know what id was generated for the person
      returning category.map(_.id)
      // And we define a transformation for the returned value, which combines our original parameters with the
      // returned id
      into ((name, id) => Category(id, name))
    // And finally, insert the person into the database
    ) += (name)
  }

  def select(id: Long): Future[Option[Category]] = db.run {
    category.filter(_.id === id)
      .result
      .headOption
  }

  def update(id: Long, name: String): Future[Int] = {
    val q = category.filter(_.id === id)
      .map(x => (x.name))
      .update((name))

    db.run(q)
  }

  /**
   * List all the people in the database.
   */
  def list(): Future[Seq[Category]] = db.run {
    category.result
  }

  def delete(id: Long): Future[Int] = {
    val q = category.filter(_.id === id).delete
    db.run(q)
  }
}
