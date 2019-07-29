const Telegraf = require('telegraf')
var fs = require('fs')

process.env.BOT_TOKEN = '882404980:AAH37wn5mDwcZUHYzDPCypqwPf7sSQra4zI'

const newRecordBonusPoints = 100
const questBonusPoints = 100


function handleText(ctx) {
  words = []
  if (ctx.message.text.includes(' ')) {words = ctx.message.text.split(' ')} else {words[0] = ctx.message.text}
  for (i in words) {words[i] = words[i].toLowerCase()} //тут слова в lower case перевожу

  data = fs.readFileSync('exercises.txt', 'utf-16')
  exercisesArray = []
  exercises = {}
  console.log(data)
  exercisesArray = data.split(/ |\n/)
  console.log(exercisesArray[0])
  for (i=0; i<exercisesArray.length; i+=2){
    exercises[exercisesArray[i]] = exercisesArray[i+1]
  }
  console.log(exercises) //тут мучу объект с упражнениями

  if (checkIfExercise(words, exercises)) {
    var additionalPoints = 0
    if (checkIfExerciseRecord()) {additionalPoints += newRecordBonusPoints()} else {additionalPoints += countAdditionalPointsPerExercise()}
    if (checkIfQuest()) {additionalPoints += questBonusPoints}
    ctx.reply('you have commited an exercise!')
  } // тут обрабатываю текст (только это должно остаться в функции)

  ctx.reply(words[0])
}

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Добро пожаловать! Этот бот предназначен для самомотивации Дениса, по-турецки Море, Утарбаева к занятиям спорту. Если вы не Денис Утарбаев, то не пытайтесь использовать бот без ведома автора, так как в таком случае работа бота будет нарушена. *Если вам понравится функционал, я могу сделать поддержку нескольких пользователей, главное - свяжитесь со мной*'))
bot.help((ctx) => ctx.reply('Команды: *добавить упражнение*'))
bot.on('sticker', (ctx) => ctx.reply(''))
bot.on('text', (ctx) => handleText(ctx))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
//bot.hears('добавить упражнение', (ctx) => )
bot.launch()

function setTodaysQuest() {
  //functionbody
  //optional return
}

function countAdditionalPointsPerExercise() {

  return 2
}

function checkIfQuest() {
  return false
}

function checkIfExercise(words, exercises) {
  if (words[0] in exercises) {return true}
  return false
}

function checkIfExerciseRecord() {

  return false
}

function addPointsToCurrentWeek () {

}
