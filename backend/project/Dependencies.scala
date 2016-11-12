import play.sbt.PlayImport.jdbc
import sbt._

object Version {
  lazy val scala                = "2.11.8"
  lazy val app                  = "0.1"

  lazy val playSlick            = "2.0.0"
  lazy val postgresDriver       = "9.4.1209.jre7"
  lazy val jodaMapper           = "2.2.0"

  lazy val akka                 = "2.4.9"
  lazy val time                 = "2.12.0"
  lazy val json4s               = "0.5.0"
}

object Libraries {

  lazy val time                 = "com.github.nscala-time"         %% "nscala-time"            % Version.time
  lazy val playSlick            = "com.typesafe.play"              %% "play-slick"             % Version.playSlick
  lazy val jodaMapper           = "com.github.tototoshi"           %% "slick-joda-mapper"      % Version.jodaMapper
  lazy val postgresDriver       = "org.postgresql"                 %  "postgresql"             % Version.postgresDriver
  lazy val json4s               = "com.github.tototoshi"           %% "play-json4s-native"     % Version.json4s
  lazy val json4sExt            = "org.json4s"                     %% "json4s-ext"             % "3.3.0"
}

object Dependencies {
  import Libraries._

  val slick = Seq(playSlick, postgresDriver, jodaMapper)

  val common = (Seq(time, jdbc, json4s, json4sExt) ++ slick).map( _.exclude("com.zaxxer", "HikariCP-java6"))
}