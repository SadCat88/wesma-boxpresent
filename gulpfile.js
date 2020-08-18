'use strict';

// =============================================================================
// === connecting modules
// =============================================================================
const gulp = require('../../node_modules/gulp');
// gulp
const del = require('../../node_modules/del');
// удаляет файлы
const browserSync = require('../../node_modules/browser-sync').create();
// локальный сервер

const newer = require('../../node_modules/gulp-newer');
// фильтр, который не копирует те файлы, которые уже есть в папке назначения

const pug = require('../../node_modules/gulp-pug');
// pug compile
const sass = require('../../node_modules/gulp-sass');
// sass compile
const sassGlob = require('../../node_modules/gulp-sass-glob');
// sass glob path to @import "./*.scss";

const sourcemaps = require('../../node_modules/gulp-sourcemaps');
// создание sourcemaps
const cleanCSS = require('../../node_modules/gulp-clean-css');
// минификатор CSS

const debug = require('../../node_modules/gulp-debug');
// вывод ошибок в консоль
const plumber = require('../../node_modules/gulp-plumber');
// предотвращает прерывание потока в случае ошибки
const notify = require('../../node_modules/gulp-notify');
// уведомление в случае появления ошибки
const validator = require('../../node_modules/gulp-w3c-html-validator');
// W3C валидатор HTML

const remember = require('../../node_modules/gulp-remember');
// запоминает файлы прошедшие через поток в прошлый раз

// =============================================================================
// === additional variables
// =============================================================================

// === === пути к основным папкам
const path = {
  root: 'project',
  // корневая папка
  src: 'src',
  // папка с иходниками
  dev: 'dev',
  // папка с быстрой сборкой для дальнейшей разработки
  review: 'review',
  // папка сборки для передачи на ревью
  prod: 'prod',
  // папка с финальной сборкой в продакшен
};

// =============================================================================
// === single tasks [dev]
// =============================================================================

// === запуск локального сервера [dev]
gulp.task('dev-run-server', function () {
  browserSync.init({
    server: {
      baseDir: `./${path.root}/${path.dev}`,
      // в какой папке искать index.html для запуска
      index: 'index.html',
      // как называется начальный файл для загрузки браузером
    },
    port: 3000,
    // порт на котором запустится browserSync
    ui: {
      port: 3001,
      // порт для user interface
    },
  });
});

// === удалить содержимое папки [dev]
gulp.task('dev-delete', function () {
  return del([`./${path.root}/${path.dev}/**`], {
    read: false,
  });
});

// === копирование файлов в папку [dev]
gulp.task('dev-copy-files', function () {
  // для переноса всех стандартных файлов из папки src в dev
  return (
    gulp
      .src(
        [
          `./${path.root}/${path.src}/**/*.+(html|css|js|map)`,
          `!./${path.root}/${path.src}/assets/vendors/source/**`,
          // web files
          `./${path.root}/${path.src}/**/*.+(jpeg|jpg|JPG|png|svg|gif|ico)`,
          // images
          `./${path.root}/${path.src}/**/*.+(eot|ttf|woff|woff2)`,
          // fonts
          `!./${path.root}/${path.src}/assets/fonts/icons/**`,
          // icon font
        ]
        // { since: gulp.lastRun('dev-copy-files') }
      )
      .pipe(newer(`./${path.root}/${path.dev}`))
      // только те, которые уже не лежат в приемнике
      .pipe(debug({ title: '= copy:' }))
      .pipe(gulp.dest(`./${path.root}/${path.dev}`))
      .pipe(browserSync.stream())
  );
});

// === компиляция pug [dev]
gulp.task('dev-pug-compile', function () {
  return (
    gulp
      .src(
        [
          `./${path.root}/${path.src}/**/*.+(pug|jade)`,
          `!./${path.root}/${path.src}/**/_*.+(pug|jade)`,
        ],
        {
          since: gulp.lastRun('dev-pug-compile'),
        }
      )
      .pipe(
        // обработчик ошибок
        plumber({
          errorHandler: notify.onError(function (err) {
            return {
              title: 'dev Pug compile',
              message: err.message,
            };
          }),
        })
      )
      .pipe(debug({ title: '+ compile:' }))
      .pipe(remember('remember-dev-pug'))
      .pipe(pug({ pretty: true }))
      // минификация отключена
      .pipe(gulp.dest(`./${path.root}/${path.dev}`))
      .pipe(browserSync.stream())
  );
});

// === W3C валидатор HTML [dev]
gulp.task('dev-html-validator', function () {
  return (
    gulp
      .src([`./${path.root}/${path.dev}/*.html`], {
        since: gulp.lastRun('dev-html-validator'),
      })
      .pipe(debug({ title: '+ validation:' }))
      .pipe(validator())
      // запуск валидатора на анализ
      .pipe(validator.reporter())
    // отчет
  );
});

// === компиляция SCSS [dev]
// и создание sourcemaps к ним
gulp.task('dev-scss-compile', function () {
  return (
    gulp
      .src(
        [
          `./${path.root}/${path.src}/**/*.+(scss|sass)`,
          `!./${path.root}/${path.src}/**/vendors/**`,
        ],
        {
          since: gulp.lastRun('dev-scss-compile'),
        }
      )
      .pipe(
        // обработчик ошибок
        plumber({
          errorHandler: notify.onError(function (err) {
            return {
              title: 'dev SCSS compile',
              message: err.message,
            };
          }),
        })
      )
      .pipe(debug({ title: '+ compile:' }))
      .pipe(remember('remember-dev-scss'))
      .pipe(sourcemaps.init())
      // отсюда следим за изменениями для создания sourcemaps
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(
        cleanCSS(
          {
            compatibility: 'ie8',
            // режим совместимость с ie8
            debug: true,
            // выводит логи в консоль
            level: {
              // уровень оптимизации
              1: {
                // список первого уровня оптимизации
                all: true,
                // использовать все опции из списка 1 уровня
                normalizeUrls: false,
                // кроме изменения URL
              },
              2: {
                // список второго уровня минификации
                all: true,
                removeUnusedAtRules: false,
                // не удалять неиспользуемые свойства (иначе удаляет font.css)
                //   restructureRules: true
                // // произвести реструктуризацию
              },
            },
          },
          (details) => {
            // вывод логов
            console.log(
              `original ${details.name}: ${details.stats.originalSize}`
            );
            console.log(
              `minify   ${details.name}: ${details.stats.minifiedSize}`
            );
          }
        )
      )
      .pipe(sourcemaps.write('./'))
      // запись sourcemaps
      .pipe(gulp.dest(`./${path.root}/${path.dev}`))

      .pipe(browserSync.stream())
  );
});

// === компиляция SCSS для simple-grid-layout [dev]
// и создание sourcemaps к ним
gulp.task('dev-simple-grid-layout-compile', function () {
  return (
    gulp
      .src(
        [
          `./${path.root}/${path.src}/assets/simple-grid-layout/source/**/*.scss`,
        ],
        {
          since: gulp.lastRun('dev-simple-grid-layout-compile'),
        }
      )
      .pipe(
        // обработчик ошибок
        plumber({
          errorHandler: notify.onError(function (err) {
            return {
              title: 'dev vendors SCSS compile',
              message: err.message,
            };
          }),
        })
      )
      .pipe(debug({ title: '+ simple-grid-layout compile:' }))
      .pipe(remember('remember-simple-grid-layout'))
      .pipe(sourcemaps.init())
      // отсюда следим за изменениями для создания sourcemaps
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(sourcemaps.write('./'))
      .pipe(
        gulp.dest(`./${path.root}/${path.src}/assets/simple-grid-layout/css`)
      )
  );
});

// === копирование JS для simple-grid-layout [dev]
gulp.task('dev-simple-grid-layout-copy-files', function () {
  return (
    gulp
      .src([
        `./${path.root}/${path.src}/assets/simple-grid-layout/source/**/*.js`,
      ])
      .pipe(
        newer(
          `./${path.root}/${path.src}/assets/simple-grid-layout/js`
        )
      )
      // только те, которые уже не лежат в приемнике
      .pipe(debug({ title: '= copy:' }))
      .pipe(
        gulp.dest(
          `./${path.root}/${path.src}/assets/simple-grid-layout/js`
        )
      )
      .pipe(browserSync.stream())
  );
});

// =============================================================================
// === watches [dev]
// =============================================================================

// === === watch [dev]
gulp.task('dev-watch', function () {
  // === при изменении pug
  // компиляция и валидация
  gulp.watch(
    [`./${path.root}/${path.src}/**/*.+(pug|jade)`],
    gulp.series(['dev-pug-compile', 'dev-html-validator'])
  );

  // === при изменении html
  // валидация
  gulp.watch(
    [`./${path.root}/${path.src}/**/*.html`],
    gulp.series(['dev-html-validator'])
  );

  // === при изменении scss
  // компиляция
  gulp.watch(
    [
      `./${path.root}/${path.src}/**/*.+(scss|sass)`,
      `!./${path.root}/${path.src}/**/vendors/**`,
    ],
    gulp.parallel(['dev-scss-compile'])
  );

  // === при изменении исходников SCSS для simple-grid-layout
  // компиляция
  gulp.watch(
    [
      `./${path.root}/${path.src}/assets/simple-grid-layout/source/**/*.scss`,
    ],
    gulp.parallel(['dev-simple-grid-layout-compile'])
  );

  // === при изменении исходников JS для  simple-grid-layout
  // копирование
  gulp.watch(
    [
      `./${path.root}/${path.src}/assets/simple-grid-layout/source/**/*.js`,
    ],
    gulp.parallel(['dev-simple-grid-layout-copy-files'])
  );

  // === при изменении файлов не требующих компиляции
  // копирует их
  gulp.watch(
    [
      `./${path.root}/${path.src}/**/*.+(html|css|js)`,
      `./${path.root}/${path.src}/**/*.+(jpeg|jpg|JPG|png|svg|gif|ico)`,
      `./${path.root}/${path.src}/**/*.+(eot|ttf|woff|woff2)`,
      `!./${path.root}/${path.src}/assets/fonts/icons/**`,
    ],
    gulp.series(['dev-copy-files'])
  );
});

// =============================================================================
// === group tasks [dev]
// =============================================================================

// === default task [dev]
gulp.task(
  'default',
  gulp.series(
    'dev-delete',
    'dev-pug-compile',
    gulp.parallel(
      'dev-scss-compile',
      'dev-copy-files',
      'dev-run-server',
      'dev-watch'
    )
  )
);
