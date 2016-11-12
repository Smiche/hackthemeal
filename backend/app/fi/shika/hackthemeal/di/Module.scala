package fi.shika.hackthemeal.di

import com.google.inject.AbstractModule
import fi.shika.hackthemeal.checker.{DatabaseChecker, DatabaseCheckerImpl}
import play.api.libs.concurrent.AkkaGuiceSupport


class Module extends AbstractModule with AkkaGuiceSupport {
  override def configure() = {
    bind(classOf[DatabaseChecker])
      .to(classOf[DatabaseCheckerImpl])
      .asEagerSingleton()
  }
}
