$(function() {
  // timeline Widget
  // the widget definition, where "whimsical" is the namespace,
  $.widget( "whimsical.timeline", {
    // default options
    options: {
      events: [],
      range: null, 
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      
      tipContainer: null,
      tipTrigger: 'hover',

      tipFormatter: function(tip, options) {
        return tip;
      },

      // callbacks
      beforeCreate: null,
      afterCreate: null
    },
  
    // the constructor
    _create: function() {
      this._trigger('beforeCreate');

      this.options.events.sort(function(x, y) {
        return x.range[0].getTime() > y.range[0].getTime() ? 1 : -1;
      });

      var end_range = this.options.events[this.options.events.length-1].range[1];
      var start_range = this.options.events[0].range[0];
      this.options.range = this.options.range || [start_range, 
                                                  new Date(end_range.setMonth(end_range.getMonth() + 1))];
      if (start_range.getMonth() !== 0) {
        this.options.range[0] = new Date(start_range.getFullYear(), 0, 1);
        this.options.events.unshift({
          range: [this.options.range[0], this.options.events[0].range[0]],
          class: 'filler'
        });
      }

      this.num_months = this._getMonths(this.options.range[0], this.options.range[1]);
      var this_element = this;
      var $this_element = (this.element)
        // add a class for theming
        .addClass( 'whimsical-timeline' );

      // This is the fastest way.  Append to the DOM only once at the very end
      var $this_tbl = $(document.createElement('table'))
        //.appendTo($this_element)
        //.prop('border', '1px')
        .prop('id', 'whimsical-timeline_' + $('.whimsical-timeline').length);

      if (this.options.range[0] > this.options.range[1]) {
        var save_it = this.options.range[0];
        this.options.range[0] = this.options.range[1];
        this.options.range[1] = save_it;
      }

      var $tbody = $(document.createElement('tbody'));

      this.$events = $(document.createElement('tr'))
        .addClass( 'timeline-events' )
        .appendTo($tbody);

      this.$events.append($(document.createElement('td'))
        .prop('colspan', '2')
      );

      for (var ii=0; ii<this.options.events.length; ii++) {
        this._addEvent(this.options.events[ii]);
      }

      // TODO : Fix this!  Don't hardcode 3
      this.$events.append($(document.createElement('td'))
        .prop('colspan', '3')
      );

      var $top = $(document.createElement('tr'))
        .addClass( 'timeline-top' )
        .appendTo($tbody);

      var $months = $(document.createElement('tr'))
        .addClass( 'timeline-months' )
        .appendTo($tbody);

      $months.append(
        $(document.createElement('td'))
      );

      var $years = $(document.createElement('tr'))
        .addClass( 'timeline-years' )
        .appendTo($tbody);

      $years.append(
        $(document.createElement('td'))
      );

      for (ii=0; ii<Math.floor(this.num_months/12); ii++) {
        $years.append(
          $(document.createElement('td'))
            .prop('colspan', 24)
            .html(this.options.range[0].getFullYear() + ii)
        );
      }

      var remaining_months = this.num_months%12*2;
      if (remaining_months > 0) {
        $years.append(
          $(document.createElement('td'))
            .prop('colspan', remaining_months)
            .html(this.options.range[0].getFullYear() + Math.floor(this.num_months/12))
        );
      }

      for (ii=0; ii<this.num_months+1; ii++) {
        $top.append(
          $(document.createElement('td'))
            .prop('colspan', '2')
        );

        var this_month = this.options.months[ii%12];
        //if (this_month === 'Jan') {
        //  this_month = 'Jan\n' + this.options.range[0].getFullYear() + ii;
        //}

        $months.append(
          $(document.createElement('td'))
            .prop('colspan', '2')
            .html(this_month)
            .addClass('month')
            .prop('id', 'month-'+ii)
        );
      }

      $top.append(
        $(document.createElement('td'))
      );

      $tbody.appendTo($this_tbl);
      $this_tbl.appendTo($this_element);

      // Make sure this is the final step of the create function
      this_element._trigger('afterCreate');
    },
    _destroy: function() {
      //// remove generated elements
      //this.changer.remove();
      this.element
        .removeClass( "whimsical-timeline" );
    },
    _addEvent: function(event) {
      var $elem = $(document.createElement('td'))
        .prop('colspan', this._getMonths(event.range[0], event.range[1]) * 2)
        .prop('title', this.options.tipFormatter.call(this, event));

      $elem.tooltip({
        container: this.options.tipContainer || $elem,
        html: true,
        trigger: this.options.tipTrigger
      })
      .data({
          'event': event,
          'id': event.id
      })
      .prop('id', (event.id ? 'event-' + event.id : 'event'))
      .addClass('timeline-event' + (event.class ? ' ' + event.class : ''))
      this.$events.append($elem);
    },
    _getMonths: function(d1, d2) {
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth() + 1;
      months += d2.getMonth();
      return (months <= 0 ? 0 : months) + 1;
    }
  });
});



