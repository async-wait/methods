(function ($, win, doc) {
  $.fn.select = function (options = {}) {
    const _container = $(options.container);
    const input = _inputDom();
    const span = _caretIcon();
    const ul = _creatOptions();
    _container.append(input).append(span).append(ul);

    _container.on('click', function () {
      $(this).toggleClass('focus').find('.list').slideToggle(240).siblings('.tag').toggleClass('is-reverse');
    });

    function _inputDom() {
      const input = $('<input/>');
      let className = options.disabled ? 'input-inner disabled' : 'input-inner';
      input.attr({
        class: className,
        type: 'text',
        readonly: 'readonly',
        placeholder: options.placeholder || '请选择',
        disabled: options.disabled || true
      });
      return input;
    }

    function _caretIcon() {
      const span = $('<span></span>');
      span.attr({
        class: 'tag'
      });
      return span;
    }

    function _creatOptions() {
      const ul = $('<ul></ul>');
      ul.attr({
        class: 'list'
      });
      options.list.forEach(item => {
        let li = $(`<li>${item}</li>`);
        ul.append(li);
        li.on('mouseenter click', function (e) {
            if (e.type === 'click') {
                $(this).addClass('active').siblings().removeClass('active');
                let targetValue = $(this).text();
                $(this).parent().siblings('.input-inner').attr({value: targetValue});
            }
            $(this).addClass('hover').siblings().removeClass('hover');
        });
      });
      return ul;
    }
  }
})(jQuery, window, document);