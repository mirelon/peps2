function showOnly(id) {
  if (id === 'menu') {
    $('.menuitem').each(function(i,e){
      let key = [$(e).attr('subtest'), localStorage.rodnecislo, localStorage.meno, localStorage.priezvisko, localStorage.pohlavie].join('_');
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

function commonFinish() {
  $('.left').css('background-image', '');
  $('.right').css('background-image', '');
  $('#centerimg').unbind('click');
  $('#fullscreen').unbind('click');
  $('#splitleft').unbind('click');
  $('#splitright').unbind('click');
  clearTimeout(currentTimeout);
  keyPressed = function(){};
  showOnly('menu');
}

function ulozBody(subtest, body) {
  const key = [subtest, localStorage.rodnecislo, localStorage.meno, localStorage.priezvisko, localStorage.pohlavie].join('_');
  localStorage[key] = body;
}

let keyPressed = function(){};

function f() {

  let i = 0;
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

  function showItem(i) {
    $('#leftimg').attr('src', imageLeft(items[i].item));
    $('#rightimg').attr('src', imageRight(items[i].item));
    new Audio(sound(items[i].sound, items[i].correct)).play();
    showOnly('splitscreen');
    // setTimeout(function(){}, timeout['f']);
  }

  function finish() {
    ulozBody('F', body);
    commonFinish();
  }

  function start() {
    showItem(i);
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
    debugMessage(i, isCorrect(items[i], side, function(){body += 1;}), body);
    i += 1;
    if (items[i]) {
      showItem(i);
    } else {
      finish();
    }
  }

  start();

}

function g() {

  let i = 0;
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

  function showItem(i) {
    $('#centerimg').attr('src', image(items[i].item));
    showOnly('fullscreen');
  }

  function finish() {
    ulozBody('G', body);
    commonFinish();
  }

  function start() {
    showItem(i);
  }

  keyPressed = function(key) {
    // 1,2,4,5,8,9,12,13 - oznam
    // 0,3,6,7,10,11,14,15 - otazka
    const oznam = [1,2,4,5,8,9,12,13,16,17].includes(i);
    console.log(oznam);
    console.log(key);
    const correct = (key===1 && oznam) || (key===2 && !oznam);
    if (!items[i].practice && !items[i].example && correct) {
      body += 1;
    }
    debugMessage(i, correct, body);
    i += 1;
    if (items[i]) {
      showItem(i);
    } else {
      finish();
    }
  };

  start();

}

function h() {

  let i = 0;
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

  function showItem(i) {
    $('#centerimg').attr('src', image(items[i].item));
    showOnly('fullscreen');
    new Audio(sound(items[i].item, items[i].correct)).play();
    currentTimeout = setTimeout(showLikeOrNot, timeout['h']);
  }

  function showLikeOrNot() {
    $('#leftimg').attr('src', 'img/likes.bmp');
    $('#rightimg').attr('src', 'img/doesnt.bmp');
    showOnly('splitscreen');
  }

  function finish() {
    ulozBody('H', body);
    commonFinish();
  }

  function start() {
    showItem(i);
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
    debugMessage(i, isCorrect(items[i], side, function(){body += 1;}), body);
    i += 1;
    if (items[i]) {
      showItem(i);
    } else {
      finish();
    }
  }

  start();

}

function i() {

  let i = 0;
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

  $('.left').css('background-image', 'radial-gradient(red, red, red, yellow, lightgreen)');
  $('.right').css('background-image', 'radial-gradient(red, red, red, maroon, black)');

  function image(item) {
    return 'img/' + item + '.bmp';
  }

  function showItem(i) {
    $('#centerimg').attr('src', image(items[i].item));
    $('#fullscreen').click(showLikeOrNot);
    showOnly('fullscreen');
  }

  function showLikeOrNot() {
    $('#leftimg').attr('src', 'img/likes.bmp');
    $('#rightimg').attr('src', 'img/doesnt.bmp');
    $('#splitleft').unbind('click').click(function(){
      console.log('#splitleft click');
      sideClicked(1);
    });
    $('#splitright').unbind('click').click(function(){
      console.log('#splitright click');
      sideClicked(2);
    });
    keyPressed = function(key) {
      result.tester = key;
      judge();
    };
    showOnly('splitscreen');
  }

  function finish() {
    ulozBody('I', body);
    commonFinish();
  }

  function start() {
    showItem(i);
  }

  function sideClicked(side) {
    result.client = side;
    judge();
  }

  function judge() {
    if (result.tester !== null && result.client !== null) {
      console.log(result.tester, result.client);
      const correct = result.tester === result.client;
      if (!items[i].practice && !items[i].example && correct) {
        body += 1;
      }
      keyPressed = function(){};
      result = {
        tester: null,
        client: null
      };
      debugMessage(i, correct, body);
      i += 1;
      if (items[i]) {
        showItem(i);
      } else {
        finish();
      }
    }
  }

  start();

}

function p() {

  let i = 0;
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

  function showItem(i) {
    $('#leftimg').attr('src', image(items[i].left));
    $('#rightimg').attr('src', image(items[i].right));
    new Audio(sound(items[i].sound)).play();
    showOnly('splitscreen');
    // setTimeout(function(){}, timeout['p']);
  }

  function finish() {
    ulozBody('P', body);
    commonFinish();
  }

  function start() {
    showItem(i);
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
    debugMessage(i, isCorrect(items[i], side, function(){body += 1;}), body);
    i += 1;
    if (items[i]) {
      showItem(i);
    } else {
      finish();
    }
  }

  start();

}

function q() {

  let i = 0;
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

  function showItem(i) {
    $('#centerimg').attr('src', image(items[i].item));
    new Audio(sound(items[i].sound)).play();
    showOnly('fullscreen');
  }

  function finish() {
    ulozBody('Q', body);
    commonFinish();
  }

  function start() {
    $('#centerimg').attr('src', 'img/field.bmp');
    setTimeout(function(){new Audio('sounds/cow.wav').play();}, 1500);
    new Audio('sounds/sheep.wav').play();
    $('#fullscreen').click(function() {
      $('#fullscreen').unbind('click');
      showItem(1);
    });
    showOnly('fullscreen');
  }

  keyPressed = function(key) {
    // 1,2,4,6,8,10,12,14,16,18 - farba(1)
    // 0,3,5,7,9,11,13,15,17,19 - zviera(2)
    const farba = [1,2,4,6,8,10,12,14,16,18].includes(i);
    const correct = (key === 1 && farba) || (key === 2 && !farba);
    if (!items[i].practice && !items[i].example && correct) {
      body += 1;
    }
    debugMessage(i, correct, body);
    i += 1;
    if (items[i]) {
      showItem(i);
    } else {
      finish();
    }
  };

  start();

}

$(document).ready(function(){
  $('input[type=text]').each(function() {
    $(this).val(localStorage[this.id]);
  });
  if (['muz', 'zena'].includes(localStorage.pohlavie)) {
    $('#' + localStorage.pohlavie).attr('checked', true);
  }
  $('input[type=text]').click(function(){
    this.setSelectionRange(0, this.value.length);
  });
  showOnly('menu');
});

document.onkeydown = function(evt) {
  evt = evt || window.event;
  let isEscape = false, isOne = false, isTwo = false, isThree = false;
  if ("key" in evt) {
    isEscape = (["Escape", "Esc"].includes(evt.key));
    isOne = (["1", "+", "!"].includes(evt.key));
    isTwo = (["2", "ľ", "@"].includes(evt.key));
    isThree = (["3", "š", "#"].includes(evt.key));
  } else {
    isEscape = (evt.keyCode === 27);
    isOne = ([49, 97].includes(evt.keyCode));
    isTwo = ([50, 98].includes(evt.keyCode));
    isThree = ([51, 99].includes(evt.keyCode));
  }
  if (isEscape) {
    commonFinish();
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
$('#rodnecislo').keyup(function(){
  localStorage.rodnecislo = this.value;
  showOnly('menu');
});
$('input[name=pohlavie]').change(function(){
  localStorage.pohlavie = this.id;
  showOnly('menu');
});
$('#vysledkybutton').click(function(){
  let rows = {};
  for (const key in localStorage) {
    const fields = key.split('_');
    if (fields.length === 5) {
      const client = fields.slice(1).join('_');
      rows[client] = rows[client] || {};
      rows[client][fields[0]] = localStorage[key];
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
