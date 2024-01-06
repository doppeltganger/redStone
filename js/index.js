jQuery(function ($) {
  /*----- helpers ----- */
  const $body = $('body');

  const isMobile = () => {
    return $(window).width() < 992;
  };


  /*----- initialize language ----- */
  const $href = window.location.href;
  const $headerLangLink = $('.header__lang-link');
  const $headerLangLinkUa = $('.header__lang-link--ua');
  const $headerLangLinkEn = $('.header__lang-link--en')
  const $headerLangLinkRu = $('.header__lang-link--ru')

  $headerLangLink.removeClass('header__lang-link--active');

  if ($href.includes('en')) {
    $headerLangLinkEn.addClass('header__lang-link--active');
  } else if ($href.includes('ru')) {
    $headerLangLinkRu.addClass('header__lang-link--active');
  } else {
    $headerLangLinkUa.addClass('header__lang-link--active');
  }


  /*----- open/close for header-menu ----- */
  const $header = $('.header');
  const $headerMenuButton = $('.header__menu-btn');
  let $isOpenHeaderMenu = false;

  function openHeaderMenu() {
    $body.addClass('body--fixed');
    $header.addClass('header--active');

    $isOpenHeaderMenu = true;
  };

  function closeHeaderMenu() {
    $body.removeClass('body--fixed');
    $header.removeClass('header--active');
    
    $isOpenHeaderMenu = false;
  };

  $headerMenuButton.on('click', function() {
    if (!$isOpenHeaderMenu) {
      openHeaderMenu();
    } else {
      closeHeaderMenu();
    }
  });


/*----- open/close for header-submenu ----- */
const $headerSubmenuItem = $('.header__menu-item--submenu');
const $headerSubmenuButton = $('.header__submenu-btn');

$headerSubmenuItem.on('click', function() {
  let $this = $(this);
  
  if ($this.hasClass('header__menu-item--active')) {
    $this.removeClass('header__menu-item--active');
    isMobile() && $this.find('.header__submenu').slideUp(300);
  } else {
    $this.parent().find('.header__menu-item').removeClass('header__menu-item--active');
    isMobile() && $this.parent().find('.header__submenu').slideUp(300);
    $this.addClass('header__menu-item--active');
    isMobile() && $this.find('.header__submenu').slideToggle(350);
  }
});

  $headerSubmenuButton.on('click', function() {
    let $this = $(this);
    $this.parent().removeClass('header__menu-item--active')
  });


  /*----- logic for popup ----- */
  const $popup = $('.popup');
  const $popupBody = $('.popup__body');
  const $popupOpenButton = $('.header .header__visible .header__action-btn');
  const $popupCloseButton = $('.popup__close-btn');

  async function fetchRequest() {
    return fetch('https://api.jsonbin.io/v3/b/6598d4ef266cfc3fde7329d3 ')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      })
      .catch(function (error) {
        console.error('Error fetching the JSON file:', error)
      });
  };

  async function getPopupData() {
    const $fetchData = await fetchRequest();
    const $parsedData = JSON.parse(JSON.stringify($fetchData.record))

    $popupBody.html($parsedData.innerHTML); 
  }

  $popupOpenButton.on('click', function() {
    $popup.addClass('popup--active');
    $body.addClass('body--fixed');

    getPopupData();
  });

  $popupCloseButton.on('click', function() {
    if ($popup.hasClass('popup--active')) {
      $popup.removeClass('popup--active');
      $body.removeClass('body--fixed');
    }
  });


  /*----- follow cursor for categories section ----- */
  $('.categories-card__review-btn').on('mousemove', function (element) {
    const $target = $(this);
    const $reviewIcon = $target.find('.categories-card__review-icon');
    const $targetWidth = $target.width();
    const $targetHeight = $target.height();
    const $reviewButtonRect = element.currentTarget.getBoundingClientRect();
    const $reviewButtonRectX = element.clientX - $reviewButtonRect.left;
    const $reviewButtonRectY = element.clientY - $reviewButtonRect.top;
  
    TweenLite.to($reviewIcon, 1, { x: $reviewButtonRectX - $targetWidth / 2, y: $reviewButtonRectY - $targetHeight / 2 });
  }).on('mouseleave', function () {
    TweenLite.to($(this).find('.review-icon'), .5, { x: 0, y: 0 });
  });
});