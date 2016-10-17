/**
 * Used to have the ability to migrate users
 * if we change the db schema. When a connection
 * to indexedDB is opened with a higher version,
 * there will be an onupgradeneeded event called
 * which we can use to convert users on older
 * paradigms to the current one.
 */
export const DB_VERSION = 5;

/**
 * The name of our entire indexedDB instance.
 */
export const DB_NAME = 'RESTED';

/**
 * The name of the "table" in indexedDB we use for
 * our collections.
 */
export const DB_OBJECT_STORE_NAME = 'collections';

/**
 * The name of the "table" in indexedDB we use for
 * our URL variables.
 */
export const DB_URL_VARIABLES_STORE_NAME = 'urlVariables';

/**
 * The name of the "table" in indexedDB we use for
 * storing request history
 */
export const DB_HISTORY_STORE_NAME = 'history';

/**
 * The name of the "table" in indexedDB we use for
 * storing application options
 */
export const DB_OPTIONS_STORE_NAME = 'options';

/**
 * This is the index of the selected collection
 * group on load of the application. This is the
 * collection that groups will be added to if a
 * different collection is not specified by the
 * user.
 */
export const DEFAULT_SELECTED_COLLECTION = '0';

/**
 * The default max length of the history list.
 * The list will be truncated to only allow this
 * size. Is overridable as an option.
 */
export const DEFAULT_HISTORY_SIZE = 10;

/**
 * This is the request used to initialize the
 * request panel. This can be either on
 * application load or on request reset.
 */
export const DEFAULT_REQUEST = {
  method: 'GET',
  headers: [{
    name: '',
    value: '',
  }],
  formData: [{
    name: '',
    value: '',
  }],
  cache: false,
};

/**
 * Holds the different types of requests
 * that this client supports alongside some
 * metadata about these request types.
 */
export const REQUEST_METHODS = [{
  method: 'GET',
}, {
  method: 'POST',
  hasBody: true,
}, {
  method: 'PUT',
  hasBody: true,
}, {
  method: 'DELETE',
}, {
  method: 'PATCH',
  hasBody: true,
}, {
  method: 'HEAD',
}, {
  method: 'JSONP',
}, {
  method: 'CUSTOM',
  hasBody: true,
}];

export const DEFAULT_REQUEST_METHOD = 'GET';

/**
 * The milliseconds we delay showing spinners
 * after a request has been sent.
 */
export const SPINNER_SHOW_DELAY = 300;

/**
 * These are the themes available on bootswatch,
 * alphabethic order - except application default
 * (yeti) first, then bootstrap default (retro).
 *
 * TODO: There are some themes (Black backgrounds)
 * that simply DO NOT work with the logo. We need
 * to figure out something if we want to add them
 * back in. (Make logo white? SVG?)
 */
export const THEMES = [
  'yeti',
  'retro',
  'cerulean',
  'cosmo',
  'cyborg',
  'darkly',
  'flatly',
  'journal',
  'lumen',
  'paper',
  'readable',
  'sandstone',
  'simplex',
  'slate',
  'spacelab',
  'superhero',
  'united',
];

/**
 * These are the styles we apply to the response
 * in the request view. Translation: this applies
 * color to the result. (highlight.js)
 */
export const HIGHLIGHT_STYLES = [
  { title: 'Default', style: 'default' },
  { title: 'Dark', style: 'dark' },
  { title: 'Grayscale', style: 'grayscale' },
  { title: 'FAR', style: 'far' },
  { title: 'IDEA', style: 'idea' },
  { title: 'Sunburst', style: 'sunburst' },
  { title: 'Zenburn', style: 'zenburn' },
  { title: 'Visual Studio', style: 'vs' },
  { title: 'Ascetic', style: 'ascetic' },
  { title: 'Magula', style: 'magula' },
  { title: 'GitHub', style: 'github' },
  { title: 'Github Gist', style: 'github-gist' },
  { title: 'Google Code', style: 'googlecode' },
  { title: 'Brown Paper', style: 'brown_paper' },
  { title: 'School Book', style: 'school_book' },
  { title: 'IR Black', style: 'ir_black' },
  { title: 'Solarized - Dark', style: 'solarized_dark' },
  { title: 'Solarized - Light', style: 'solarized_light' },
  { title: 'Arta', style: 'arta' },
  { title: 'Monokai', style: 'monokai' },
  { title: 'Monokai Sublime', style: 'monokai_sublime' },
  { title: 'Agate', style: 'agate' },
  { title: 'Androidstudio', style: 'androidstudio' },
  { title: 'XCode', style: 'xcode' },
  { title: 'Pojoaque', style: 'pojoaque' },
  { title: 'Rainbow', style: 'rainbow' },
  { title: 'Tomorrow', style: 'tomorrow' },
  { title: 'Tomorrow Night', style: 'tomorrow-night' },
  { title: 'Tomorrow Night Bright', style: 'tomorrow-night-bright' },
  { title: 'Tomorrow Night Blue', style: 'tomorrow-night-blue' },
  { title: 'Tomorrow Night Eighties', style: 'tomorrow-night-eighties' },
  { title: 'Railscasts', style: 'railscasts' },
  { title: 'Obsidian', style: 'obsidian' },
  { title: 'Docco', style: 'docco' },
  { title: 'Mono Blue', style: 'mono-blue' },
  { title: 'Foundation', style: 'foundation' },
  { title: 'Atelier Dun - Dark', style: 'atelier-dune.dark' },
  { title: 'Atelier Dun - Light', style: 'atelier-dune.light' },
  { title: 'Atelier Forest - Dark', style: 'atelier-forest.dark' },
  { title: 'Atelier Forest - Light', style: 'atelier-forest.light' },
  { title: 'Atelier Heath - Dark', style: 'atelier-heath.dark' },
  { title: 'Atelier Heath - Light', style: 'atelier-heath.light' },
  { title: 'Atelier Lakeside - Dark', style: 'atelier-lakeside.dark' },
  { title: 'Atelier Lakeside - Light', style: 'atelier-lakeside.light' },
  { title: 'Atelier Seaside - Dark', style: 'atelier-seaside.dark' },
  { title: 'Atelier Seaside - Light', style: 'atelier-seaside.light' },
  { title: 'Paraíso - Dark', style: 'paraiso.dark' },
  { title: 'Paraíso - Light', style: 'paraiso.light' },
  { title: 'Colorbrewer', style: 'color-brewer' },
  { title: 'Codepen.io Embed', style: 'codepen-embed' },
  { title: 'Kimbie - Dark', style: 'kimbie.dark' },
  { title: 'Kimbie - Light', style: 'kimbie.light' },
  { title: 'Hybrid', style: 'hybrid' },
  { title: 'Darkula', style: 'darkula' },
  { title: 'Hopscotch', style: 'hopscotch' },
];

/**
 * The URLs shown in the URL bar on load.
 * Add more if you want!
 * The only rule for these: Nothing NSFW or illegal
 * and it should preferably be something amusing!
 */
export const PLACEHOLDER_URLS = [
  // Comics
  'http://xkcd.com/323/',
  'http://cube-drone.com/comics/c/severity-one',
  'http://www.phdcomics.com/comics/archive.php?comicid=946',
  // Useful sites
  'http://news.ycombinator.com/',
  'http://reddit.com',
  // Random fun stuff
  'http://www.aperturescience.com',
  'http://www.pennyjuice.com/htmlversion/whoispj.htm',
  'http://www.arngren.net/',
  'http://www.lingscars.com/',
  'http://bojackhorseman.com',
  'http://visitnorway.com',
];

