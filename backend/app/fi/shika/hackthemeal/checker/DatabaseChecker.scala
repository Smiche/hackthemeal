package fi.shika.hackthemeal.checker

import com.google.inject.Inject
import fi.shika.hackthemeal.persistence.TableComponent
import fi.shika.hackthemeal.persistence.profile.SlickProfile
import play.api.Logger
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import slick.jdbc.meta.MTable

trait DatabaseChecker

class DatabaseCheckerImpl @Inject() (protected val configProvider: DatabaseConfigProvider)
  extends DatabaseChecker
  with TableComponent
  with SlickProfile {

  private val logger = Logger(getClass.getName)

  import driver.api._

  private val tables = Seq(dishes, diners, portions)

  db.run(MTable.getTables) map { existingTables =>
    tables foreach { table =>
      logger.info(s"Checking table named ${table.baseTableRow.tableName}")

      if (!existingTables.exists(_.name.name == table.baseTableRow.tableName)) {
        logger.info(s"Creating table named ${table.baseTableRow.tableName}")

        db.run(table.schema.create)
      }
    }
  }
}