function showOnly(id) {
  if (id === 'menu') {
    $('.menuitem').each(function(i,e){
      let key = [$(e).attr('subtest'), localStorage.pocetmesiacov, localStorage.meno, localStorage.priezvisko, localStorage.pohlavie, localStorage.l2].join('_');
      $(e).toggleClass('done', localStorage[key] !== undefined);
    });
    $('#menu').show();
  } else {
    $('#menu').hide();
  }
  if (id === 'fullscreen') {
    $('#fullscreen').show();
  } else {
    $('#fullscreen').hide();
  }
  if (id === 'splitscreen') {
    $('#splitscreen').show();
  } else {
    $('#splitscreen').hide();
  }
  if (id === 'trianglescreen') {
    $('#trianglescreen').show();
  } else {
    $('#trianglescreen').hide();
  }
  $('#vysledky').hide();
}

function sklonujBody(body) {
  if (body === 1) {
    return 'bod';
  } else if (body > 1 && body < 5) {
    return 'body';
  } else return 'bodov';
}

function debugMessage(i, correct, body) {
  console.log('Item ' + i + ': ' + (correct ? 'correct' : 'wrong') + ', celkovo ' + body + ' ' + sklonujBody(body));
}

function isCorrect(item, guess, pridajBody) {
  console.log(item.correct, guess);
  if(item.correct === guess) {
    if (!item.practice && !item.example) {
      pridajBody();
    }
    return true;
  } else {
    return false;
  }
}

const timeout = { // in milliseconds
  'f': 1000,
  'h': 2000,
  'p': 2000
};

let currentTimeout;

function outtro(subtest, body) {
  $('#centerimg').attr('src', 'img/outtro.png');
  showOnly('fullscreen');
  keyPressed = function(key) {
    if (key == 1) {
      ulozBody(subtest, body);
    }
    quitToMenu();
  };
}

function quitToMenu() {
  $('.left').css('background-image', '');
  $('.right').css('background-image', '');
  $('#centerimg').unbind('click');
  $('#fullscreen').unbind('click');
  $('#splitleft').unbind('click');
  $('#splitright').unbind('click');
  clearTimeout(currentTimeout);
  keyPressed = function(){};
  showItem = function(){};
  showOnly('menu');
}

function ulozBody(subtest, body) {
  const key = [subtest, localStorage.pocetmesiacov, localStorage.meno, localStorage.priezvisko, localStorage.pohlavie, localStorage.l2].join('_');
  localStorage[key] = body + "_" + currentDate();
  $('#uploadbutton').css('background-color', '');
}

let keyPressed = function(){};

let showItem = function(){};

let baseUrl = 'https://peps-db.herokuapp.com/';

let currentTask = 0;

function f() {

  currentTask = 0;
  let body = 0;

  const items = [
    {'item': 'hranolky',  'sound': 'hranolky',  'correct': 'q', 'example': true},
    {'item': 'tea',       'sound': 'caj',       'correct': '',  'example': true},
    {'item': 'milk',      'sound': 'mlieko',    'correct': '',  'practice': true},
    {'item': 'salad',     'sound': 'salat',     'correct': 'q', 'practice': true},
    {'item': 'cheese',    'sound': 'syr',       'correct': ''},
    {'item': 'apple',     'sound': 'jablko',    'correct': 'q'},
    {'item': 'orange',    'sound': 'pomaranc',  'correct': ''},
    {'item': 'cake',      'sound': 'kolac',     'correct': 'q'},
    {'item': 'honey',     'sound': 'med',       'correct': 'q'},
    {'item': 'lemon',     'sound': 'citron',    'correct': ''},
    {'item': 'yogurt',    'sound': 'jogurt',    'correct': ''},
    {'item': 'jam',       'sound': 'dzem',      'correct': 'q'},
    {'item': 'nanuk',     'sound': 'nanuk',     'correct': ''},
    {'item': 'kecup',     'sound': 'kecup',     'correct': 'q'},
    {'item': 'hrasok',    'sound': 'hrasok',    'correct': 'q'},
    {'item': 'eggs',      'sound': 'vajicka',   'correct': ''},
    {'item': 'pivo',      'sound': 'pivo',      'correct': 'q'},
    {'item': 'paradajky', 'sound': 'paradajky', 'correct': 'q'},
    {'item': 'mushrooms', 'sound': 'hriby',     'correct': ''},
    {'item': 'raisins',   'sound': 'hrozienka', 'correct': ''}
  ];

  function imageLeft(item) {
    return 'img/q' + item + '.bmp';
  }

  function imageRight(item) {
    return 'img/t' + item + '.bmp';
  }

  function sound(snd, correct) {
    return 'sounds/SB' + correct + snd + '.wav';
  }

  showItem = function() {
    $('#leftimg').attr('src', imageLeft(items[currentTask].item));
    $('#rightimg').attr('src', imageRight(items[currentTask].item));
    new Audio(sound(items[currentTask].sound, items[currentTask].correct)).play();
    showOnly('splitscreen');
    // setTimeout(function(){}, timeout['f']);
  }

  function start() {
    showItem(currentTask);
  }

  $('#splitleft').unbind('click').click(function(){
    console.log('#splitleft click');
    sideClicked('q');
  });
  $('#splitright').unbind('click').click(function(){
    console.log('#splitright click');
    sideClicked('');
  });

  function sideClicked(side) {
    const correct = isCorrect(items[currentTask], side, function(){body += 1;});
    debugMessage(currentTask, correct, body);
    currentTask += 1;
    if (items[currentTask]) {
      showItem(currentTask);
    } else {
      outtro('F', body);
    }
  }

  start();

}

function g() {

  currentTask = 0;
  let body = 0;

  const items = [
    {'item': 'qhranolky', 'example': true},
    {'item': 'ttea',      'example': true},
    {'item': 'tmilk',     'practice': true},
    {'item': 'qsalad',    'practice': true},
    {'item': 'book1'},
    {'item': 'plate1'},
    {'item': 'book2'},
    {'item': 'plate2'},
    {'item': 'book3'},
    {'item': 'plate3'},
    {'item': 'book4'},
    {'item': 'plate4'},
    {'item': 'book5'},
    {'item': 'plate5'},
    {'item': 'book6'},
    {'item': 'plate6'},
    {'item': 'book7'},
    {'item': 'plate7'},
    {'item': 'book8'},
    {'item': 'plate8'}
  ];

  function image(item) {
    return 'img/' + item + '.bmp';
  }

  showItem = function() {
    $('#centerimg').attr('src', image(items[currentTask].item));
    showOnly('fullscreen');
  }

  function start() {
    showItem(currentTask);
  }

  keyPressed = function(key) {
    // 1,2,4,5,8,9,12,13 - oznam
    // 0,3,6,7,10,11,14,15 - otazka
    const oznam = [1,2,4,5,8,9,12,13,16,17].includes(currentTask);
    console.log(oznam);
    console.log(key);
    const correct = (key===1 && oznam) || (key===2 && !oznam);
    if (!items[currentTask].practice && !items[currentTask].example && correct) {
      body += 1;
    }
    debugMessage(currentTask, correct, body);
    currentTask += 1;
    if (items[currentTask]) {
      showItem(currentTask);
    } else {
      outtro('G', body);
    }
  };

  start();

}

function h() {

  currentTask = 0;
  let body = 0;

  const items = [
    {'item': 'tea',       'correct': 'L', 'example': true},
    {'item': 'mushrooms', 'correct': 'R', 'example': true},
    {'item': 'milk',      'correct': 'R', 'practice': true},
    {'item': 'cream',     'correct': 'L', 'practice': true},
    {'item': 'bananas',   'correct': 'L'},
    {'item': 'pears',     'correct': 'L'},
    {'item': 'eggs',      'correct': 'R'},
    {'item': 'oranges',   'correct': 'R'},
    {'item': 'bread',     'correct': 'L'},
    {'item': 'jam',       'correct': 'R'},
    {'item': 'apples',    'correct': 'L'},
    {'item': 'cake',      'correct': 'L'},
    {'item': 'honey',     'correct': 'R'},
    {'item': 'raisins',   'correct': 'R'},
    {'item': 'salad',     'correct': 'R'},
    {'item': 'leeks',     'correct': 'L'},
    {'item': 'cabbage',   'correct': 'L'},
    {'item': 'carrots',   'correct': 'R'},
    {'item': 'cheese',    'correct': 'L'},
    {'item': 'tomatoes',  'correct': 'R'}
  ];

  $('.left').css('background-image', 'radial-gradient(red, red, red, yellow, lightgreen)');
  $('.right').css('background-image', 'radial-gradient(red, red, red, maroon, black)');

  function image(item) {
    return 'img/' + item + '.bmp';
  }

  function sound(item, correct) {
    return 'sounds/SB' + item + (correct === 'L' ? '^' : '~') +'.wav';
  }

  showItem = function() {
    $('#centerimg').attr('src', image(items[currentTask].item));
    showOnly('fullscreen');
    new Audio(sound(items[currentTask].item, items[currentTask].correct)).play();
    currentTimeout = setTimeout(showLikeOrNot, timeout['h']);
  }

  function showLikeOrNot() {
    $('#leftimg').attr('src', 'img/likes.bmp');
    $('#rightimg').attr('src', 'img/doesnt.bmp');
    showOnly('splitscreen');
  }

  function start() {
    showItem(currentTask);
  }

  $('#splitleft').click(function(){
    console.log('#splitleft click');
    sideClicked('L');
  });
  $('#splitright').click(function(){
    console.log('#splitright click');
    sideClicked('R');
  });

  function sideClicked(side) {
    const correct = isCorrect(items[currentTask], side, function(){body += 1;});
    debugMessage(currentTask, correct, body);
    currentTask += 1;
    if (items[currentTask]) {
      showItem(currentTask);
    } else {
      outtro('H', body);
    }
  }

  start();

}

function i() {

  currentTask = 0;
  let body = 0;
  let result = {
    tester: null,
    client: null
  };

  const items = [
    {'item': 'tea', 'example': true},
    {'item': 'mushrooms',      'example': true},
    {'item': 'milk',     'practice': true},
    {'item': 'tomatoes',    'practice': true},
    {'item': 'bananas'},
    {'item': 'pears'},
    {'item': 'eggs'},
    {'item': 'cheese'},
    {'item': 'bread'},
    {'item': 'jam'},
    {'item': 'apples'},
    {'item': 'cake'},
    {'item': 'honey'},
    {'item': 'lemons'},
    {'item': 'salad'},
    {'item': 'leeks'},
    {'item': 'cabbage'},
    {'item': 'carrots'},
    {'item': 'oranges'},
    {'item': 'cream'}
  ];

  // https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
  function whichTransitionEvent(){
    var t,
      el = document.createElement("fakeelement");

    var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
  }
  const transitionEvent = whichTransitionEvent();
  console.log(transitionEvent);

  // $('.left').css('background-image', 'radial-gradient(red, red, red, yellow, lightgreen)');
  // $('.right').css('background-image', 'radial-gradient(red, red, red, maroon, black)');

  function image(item) {
    return 'img/' + item + '.png';
  }

  showItem = function() {
    $('#triangleup img').attr('src', image(items[currentTask].item));
    $('#triangleleft img').unbind('click').click(function(){
      console.log('#triangleleft click');
      sideClicked(1);
    });
    $('#triangleright img').unbind('click').click(function(){
      console.log('#triangleright click');
      sideClicked(2);
    });
    keyPressed = function(key) {
      result.tester = key;
      judge();
    };
    showOnly('trianglescreen');
  }

  function start() {
    showItem(currentTask);
  }

  function sideClicked(side) {
    result.client = side;
    judge();
  }

  function judge() {
    if (result.tester !== null && result.client !== null) {
      const animatedClone = $('.animated').clone();
      $('.animated').addClass('animate side'+result.tester);
      console.log(result.tester, result.client);
      const correct = result.tester === result.client;
      if (!items[currentTask].practice && !items[currentTask].example && correct) {
        body += 1;
      }
      keyPressed = function(){};
      result = {
        tester: null,
        client: null
      };
      debugMessage(currentTask, correct, body);
      $('.animated').one(transitionEvent, function() {
        $('.animated').remove();
        animatedClone.appendTo('#triangleup');
        currentTask += 1;
        if (items[currentTask]) {
          showItem(currentTask);
        } else {
          outtro('I', body);
        }
      });
    }
  }

  start();

}

function p() {

  currentTask = 0;
  let body = 0;

  const items = [
    {'left': 'blue',  'right': 'black', 'sound': 'bBLACK',  'correct': 'R', 'example': true},
    {'left': 'blue',  'right': 'black', 'sound': 'BLUEb',   'correct': 'L', 'example': true},
    {'left': 'blue',  'right': 'white', 'sound': 'BLUEw',   'correct': 'L', 'practice': true},
    {'left': 'blue',  'right': 'white', 'sound': 'bWHITE',  'correct': 'R', 'practice': true},
    {'left': 'black', 'right': 'red',   'sound': 'BLACKr',  'correct': 'L'},
    {'left': 'blue',  'right': 'green', 'sound': 'bGREEN',  'correct': 'R'},
    {'left': 'red',   'right': 'black', 'sound': 'rBLACK',  'correct': 'R'},
    {'left': 'blue',  'right': 'red',   'sound': 'BLUEr',   'correct': 'L'},
    {'left': 'green', 'right': 'blue',  'sound': 'GREENb',  'correct': 'L'},
    {'left': 'green', 'right': 'black', 'sound': 'gBLACK',  'correct': 'R'},
    {'left': 'blue',  'right': 'red',   'sound': 'bRED',    'correct': 'R'},
    {'left': 'green', 'right': 'black', 'sound': 'GREENbl', 'correct': 'L'},
    {'left': 'red',   'right': 'blue',  'sound': 'REDb',    'correct': 'L'},
    {'left': 'black', 'right': 'green', 'sound': 'BLACKg',  'correct': 'L'},
    {'left': 'green', 'right': 'blue',  'sound': 'gBLUE',   'correct': 'R'},
    {'left': 'red',   'right': 'black', 'sound': 'REDbl',   'correct': 'L'},
    {'left': 'black', 'right': 'green', 'sound': 'blGREEN', 'correct': 'R'},
    {'left': 'blue',  'right': 'green', 'sound': 'BLUEg',   'correct': 'L'},
    {'left': 'red',   'right': 'blue',  'sound': 'rBLUE',   'correct': 'R'},
    {'left': 'black', 'right': 'red',   'sound': 'blRED',   'correct': 'R'}
  ];

  function image(item) {
    return 'img/' + item + '.bmp';
  }

  function sound(item) {
    return 'sounds/SB' + item + '.wav';
  }

  showItem = function() {
    $('#leftimg').attr('src', image(items[currentTask].left));
    $('#rightimg').attr('src', image(items[currentTask].right));
    new Audio(sound(items[currentTask].sound)).play();
    showOnly('splitscreen');
    // setTimeout(function(){}, timeout['p']);
  }

  function start() {
    showItem(currentTask);
  }

  $('#splitleft').unbind('click').click(function(){
    console.log('#splitleft click');
    sideClicked('L');
  });
  $('#splitright').unbind('click').click(function(){
    console.log('#splitright click');
    sideClicked('R');
  });

  function sideClicked(side) {
    let correct = isCorrect(items[currentTask], side, function(){body += 1;});
    debugMessage(currentTask, correct, body);
    currentTask += 1;
    if (items[currentTask]) {
      showItem(currentTask);
    } else {
      outtro('P', body);
    }
  }

  start();

}

function q() {

  currentTask = 0;
  let body = 0;

  const items = [
    {'item': 'green cow',   'sound': 'green sheep', 'example': true},
    {'item': 'green sheep', 'sound': 'red sheep',   'example': true},
    {'item': 'green cow',   'sound': 'black cow',   'practice': true},
    {'item': 'green sheep', 'sound': 'green cow',   'practice': true},
    {'item': 'focus1',     'sound': 'focus1'},
    {'item': 'focus2',     'sound': 'focus2'},
    {'item': 'focus3',     'sound': 'focus3'},
    {'item': 'focus4',     'sound': 'focus4'},
    {'item': 'focus5',     'sound': 'focus5'},
    {'item': 'focus6',     'sound': 'focus6'},
    {'item': 'focus7',     'sound': 'focus7'},
    {'item': 'focus8',     'sound': 'focus8'},
    {'item': 'focus9',     'sound': 'focus9'},
    {'item': 'focus10',    'sound': 'focus10'},
    {'item': 'focus11',    'sound': 'focus11'},
    {'item': 'focus12',    'sound': 'focus12'},
    {'item': 'focus13',    'sound': 'focus13'},
    {'item': 'focus14',    'sound': 'focus14'},
    {'item': 'focus15',    'sound': 'focus15'},
    {'item': 'focus16',    'sound': 'focus16'}
  ];

  $('.left').css('background-image', 'radial-gradient(red, red, red, yellow, lightgreen)');
  $('.right').css('background-image', 'radial-gradient(red, red, red, maroon, black)');

  function image(item) {
    return 'img/' + item + '.bmp';
  }

  function sound(item) {
    return 'sounds/SB' + item + '.wav';
  }

  showItem = function() {
    $('#centerimg').attr('src', image(items[currentTask].item));
    new Audio(sound(items[currentTask].sound)).play();
    showOnly('fullscreen');
  }

  function start() {
    $('#centerimg').attr('src', 'img/field.bmp');
    let introCow = new Audio('sounds/cow.wav');
    let introSheep = new Audio('sounds/sheep.wav');
    introCow.volume = 0.1;
    introSheep.volume = 0.1;
    setTimeout(function(){introCow.play();}, 1500);
    introSheep.play();
    $('#fullscreen').click(function() {
      $('#fullscreen').unbind('click');
      showItem(currentTask);
    });
    showOnly('fullscreen');
  }

  keyPressed = function(key) {
    // 1,2,4,6,8,10,12,14,16,18 - farba(1)
    // 0,3,5,7,9,11,13,15,17,19 - zviera(2)
    const farba = [1,2,4,6,8,10,12,14,16,18].includes(currentTask);
    const correct = (key === 1 && farba) || (key === 2 && !farba);
    if (!items[currentTask].practice && !items[currentTask].example && correct) {
      body += 1;
    }
    debugMessage(currentTask, correct, body);
    currentTask += 1;
    if (items[currentTask]) {
      showItem(currentTask);
    } else {
      outtro('Q', body);
    }
  };

  start();

}

$(document).ready(function(){
  // Prefill all inputs with according to localStorage.
  // Id of input element is taken as the key to localStorage.
  $('input[type=text]').each(function() {
    $(this).val(localStorage[this.id]);
  });
  // Prefill pohlavie checkbox according to localStorage
  if (['muz', 'zena'].includes(localStorage.pohlavie)) {
    $('#' + localStorage.pohlavie).attr('checked', true);
  }
  // On click select all text in the input
  $('input[type=text]').click(function(){
    this.setSelectionRange(0, this.value.length);
  });
  showOnly('menu');
});

document.onkeydown = function(evt) {
  evt = evt || window.event;
  let isEscape = false, isBackspace = false, isOne = false, isTwo = false, isThree = false;
  if ("key" in evt) {
    isEscape = (["Escape", "Esc"].includes(evt.key));
    isBackspace = (["Backspace"].includes(evt.key));
    isOne = (["1", "+", "!"].includes(evt.key));
    isTwo = (["2", "ľ", "@"].includes(evt.key));
    isThree = (["3", "š", "#"].includes(evt.key));
  } else {
    isEscape = (evt.keyCode === 27);
    isBackspace = (evt.keyCode === 8);
    isOne = ([49, 97].includes(evt.keyCode));
    isTwo = ([50, 98].includes(evt.keyCode));
    isThree = ([51, 99].includes(evt.keyCode));
  }
  if (isEscape) {
    quitToMenu();
  }
  if (isBackspace) {
    if (currentTask > 0) {
      currentTask -= 1;
      showItem();
    }
  }
  if (isOne) {
    keyPressed(1);
  }
  if (isTwo) {
    keyPressed(2);
  }
  if (isThree) {
    keyPressed(3);
  }
};

$('#meno').keyup(function(){
  localStorage.meno = this.value;
  showOnly('menu');
});
$('#priezvisko').keyup(function(){
  localStorage.priezvisko = this.value;
  showOnly('menu');
});
$('#pocetmesiacov').keyup(function(){
  localStorage.pocetmesiacov = this.value;
  showOnly('menu');
});
$('input[name=pohlavie]').change(function(){
  localStorage.pohlavie = this.id;
  showOnly('menu');
});
$('#l2').change(function(){
  localStorage.l2 = this.value;
  showOnly('menu');
});
$('#vysledkybutton').click(function(){
  let rows = {};
  for (const key in localStorage) {
    const fields = key.split('_');
    if (fields.length === 6) {
      const client = fields.slice(1).join('_');
      rows[client] = rows[client] || {};
      rows[client][fields[0]] = localStorage[key].split('_')[0];
    }
  }
  console.log(rows);

  const html = Object.entries(rows).map(function(row) {
    client = row[0].split('_');
    vysledky = row[1];
    console.log(vysledky);
    return '<tr>' + client.map(function(cell){return '<td>' + cell + '</td>'}) + ['F', 'G', 'H', 'I', 'P', 'Q'].map(function(subtest) {return vysledokHtml(vysledky, subtest)}) + '</tr>';
  });

  $('#vysledky table tbody').html(html);
  $('#vysledky').toggle();
});

function vysledokHtml(vysledky, subtest) {
  return '<td>' + (vysledky[subtest] || '') + '</td>';
}

$('#uploadbutton').click(function(){
  const url = baseUrl + 'api/performance';
  console.log('Uploading localStorage to ' + url);
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(localStorage)
  }).then(function(){
    $('#uploadbutton').css('background-color', 'greenyellow');
  });
});

$('#downloadbutton').click(function(){
  const url = baseUrl + 'api/download_performances';
  console.log('Downloading localStorage from ' + url);
  fetch(url).then(r => r.json()).then(function(json) {
    for (let key in json) {
      console.log(key, json[key]);
      localStorage.setItem(key, json[key]);
    }
    $('#downloadbutton').css('background-color', 'greenyellow');
  });
});

$('#downloadl2button').click(function(){
  const url = baseUrl + 'api/download_l2s';
  console.log('Downloading l2s from ' + url);
  fetch(url).then(r => r.json()).then(function(json) {
    localStorage.l2s = json['l2s'];
    updateL2s();
    $('#downloadl2button').css('background-color', 'greenyellow');
  });
});

// From localStorage to HTML datalist element
function updateL2s() {
  if (localStorage.l2s) {
    $('#l2s').empty();
    for (let l2nazov of localStorage.l2s.split(',')) {
      console.log(l2nazov);
      $('#l2s').append($("<option>").text(l2nazov));
    }
  }
}

updateL2s();

function currentDate() {
  const date = new Date();
  const dd = ("0" + (date.getDate()).toString()).slice(-2);
  const mm = ("0" + (date.getMonth()+1).toString()).slice(-2);
  const yy = date.getFullYear().toString().slice(2);
  return yy + mm + dd;
}
