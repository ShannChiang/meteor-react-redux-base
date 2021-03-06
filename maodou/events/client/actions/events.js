import { browserHistory } from 'react-router';
import { handleEventError } from 'lib/helpers';

export default {
  /**** User Actions ****/
  addCover(context, url) {
    return { type: 'ADD_POST_COVER', url };
  },
  /**** Admin Actions ****/
  addEvent({ Meteor, toastr }, event, coverUrl) {
    return () => {
      event.preventDefault();
      const title = event.target.title.value;
      const time = event.target.time.value;
      const location = event.target.location.value;
      const limit = event.target.limit.value;
      const unit = event.target.unit.value;
      const fee = event.target.fee.value;
      const desc = $('#editor').html();
      Meteor.call('events.add', title, coverUrl, time, location, limit, unit, fee, desc, (err) => {
        if (err) {
          console.log(err);
          handleEventError(err);
        } else {
          toastr.success('发布成功');
          browserHistory.push('/admin/events/list');
        }
      });
    };
  },
  updateEvent({ Meteor, toastr }, event, id, coverUrl) {
    return () => {
      event.preventDefault();
      const title = event.target.title.value;
      const time = event.target.time.value;
      const location = event.target.location.value;
      const limit = event.target.limit.value;
      const unit = event.target.unit.value;
      const fee = event.target.fee.value;
      const desc = $('#editor').html();
      const eventData = {
        title,
        time,
        location,
        limit,
        coverUrl,
        unit,
        fee,
        desc
      };
      Meteor.call('events.edit', id, eventData, (err) => {
        if (err) {
          console.log(err);
          handleEventError(err);
        } else {
          toastr.success('编辑活动成功');
          browserHistory.push('/admin/events/list');
        }
      });
    };
  },
  deleteEvent({ Meteor, toastr, swal }, event, id) {
    return () => {
      event.preventDefault();
      swal({
        title: '确定删除吗？',
        text: '此操作不可撤销',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        Meteor.call('events.delete', id, (err) => {
          if (err) {
            toastr.error('删除失败');
          } else {
            toastr.success('删除成功');
          }
        });
      }, (dismiss) => {
        if (dismiss === 'cancel') {
          console.log('cancel');
        }
      });
    };
  }

};
