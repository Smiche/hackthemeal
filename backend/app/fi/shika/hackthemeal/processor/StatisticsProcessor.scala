package fi.shika.hackthemeal.processor

import javax.inject.Inject

import com.google.inject.ImplementedBy
import fi.shika.hackthemeal.persistence.model.{Diner, Dish, Portion}
import org.joda.time.DateTime

@ImplementedBy(classOf[StatisticsProcessorImpl])
trait StatisticsProcessor {

  case class DietPreferences(
    L  : Seq[Long],
    G  : Seq[Long],
    M  : Seq[Long],
    VL : Seq[Long],
    V  : Seq[Long])

  def provideMostLiked(portions: Seq[Portion]): Seq[Long]

  def provideMostLikedInDay(portions: Seq[Portion], day: DateTime): Seq[Long]

  def provideDietScores(diners: Seq[Diner]): Map[String, Int]

  def provideDietPortions(dishes: Seq[Dish]): DietPreferences

  def provideDinersForWeekDay(portions: Seq[Portion], diners: Seq[Diner], day: DateTime): Seq[Diner]

  def providePreferredDishes(portions: Seq[Portion], diners: Seq[Diner]): Seq[Long]
}

class StatisticsProcessorImpl @Inject()() extends StatisticsProcessor {

  def provideMostLiked(portions: Seq[Portion]) =
    portions.mostLiked

  def provideMostLikedInDay(portions: Seq[Portion], day: DateTime) =
    portions.filter(_.moment.getDayOfWeek == day.getDayOfWeek).mostLiked

  def provideDietScores(diners: Seq[Diner]) = {
    val usersDiets = Seq(
      ("L", diners.count(_.L == 1)),
      ("G", diners.count(_.G == 1)),
      ("M", diners.count(_.M == 1)),
      ("VL", diners.count(_.VL == 1)),
      ("V", diners.count(_.V == 1))
    )

    usersDiets.sortBy(-_._2)
      .groupBy(_._2)
      .zipWithIndex
      .flatMap { case ((count, seq), index) =>
        seq.map(it => (it._1, index)).toMap
      }
  }

  def provideDietPortions(dishes: Seq[Dish]) = DietPreferences(
    dishes.filter(_.L == 1).map(_.id.get),
    dishes.filter(_.G == 1).map(_.id.get),
    dishes.filter(_.M == 1).map(_.id.get),
    dishes.filter(_.VL == 1).map(_.id.get),
    dishes.filter(_.V == 1).map(_.id.get))

  def provideDinersForWeekDay(portions: Seq[Portion], diners: Seq[Diner], day: DateTime) = {
    val dinersId = portions.filter(_.moment.getDayOfWeek == day.getDayOfWeek)
      .map(_.dinerid)
      .groupBy(identity)
      .toSeq
      .sortBy(-_._2.size)
      .map(_._1)

    dinersId.map(s => diners.filter(_.id == s).head).take((dinersId.size * .5f).toInt)
  }

  def providePreferredDishes(portions: Seq[Portion], diners: Seq[Diner]) =
    portions.filter(s => diners.exists(_.id == s.dinerid))
      .groupBy(_.dinerid)
      .map(_._2.groupBy(_.dishid).maxBy(_._2.size)._1.get)
      .toSeq
      .distinct

  implicit class SeqExt(seq: Seq[Portion]) {
    def mostLiked = seq.groupBy(_.dishid.get).toSeq.sortBy(-_._2.size).map(_._1)
  }
}