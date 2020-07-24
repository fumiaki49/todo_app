$(function () {
  let taskArray = [];
  
  readStorage();

  $('form').submit(function(e) {
    e.preventDefault();
    let taskData = $('#task').val();
    let deadlineData = $('#deadline').val();
    let priorityData = $('input[name=priority]:checked').val();

    $('#task').val('');
    $('#deadline').val('');
    addList(taskData, deadlineData, priorityData);
    saveTask(taskData, deadlineData, priorityData);
    countTask();
  });

  $(document).on('click', '.complete-btn', function() {
    let getTaskCard = $(this).closest('.task-card');
    let taskCardIndex = getTaskCard.index();

    getTaskCard.remove();
    taskArray.splice(taskCardIndex, 1);
    saveStorage();
    if(taskArray.length === 0) {
      clean();
    }
    countTask();
  });

  $('.clean-all-task').on('click', function() {
    if (taskArray.length === 0) {
      swal.fire({
        text: "タスクはありません",
        icon: "info"
      });
      return false;
    } else {
      swal.fire({
        icon: "warning",
        text: "全てのデータが消えます。よろしいですか？",
        showCancelButton: true,
        confirmButtonText: 'OK'
      }).then(function(result) {
        if(result.value) {
          swal.fire({
            icon: "success",
            text: "削除しました。"
          });
          $('.tasks-list').empty();
          clean();
          countTask();
        }
      });
    }
  });

  $('.sort-deadline').click(function () {
    if (taskArray.length === 0) {
      return false;
    } else {
      sortSoon();
    }
  });

  $('.sort-priority').click(function () {
    if (taskArray.length === 0) {
      return false;
    } else {
      sortPriority();
    }
  });


  function addList(receivedTask, receivedDeadline, receivedPriority) {
    let taskCardTemplate = `<li class="task-card">
                              <div class="task-name card-inner">${receivedTask}</div>
                              <div class="task-detail card-inner">
                                <div class="task-detail__text-box">
                                  <div class="detail-text">
                                    <p><span class="strong">優先度：</span><span class="priority-text">${receivedPriority}</span></p>
                                  </div>
                                  <div class="detail-text">
                                    <p><span class="strong">期限：</span>${receivedDeadline}</p>
                                  </div>
                                </div>
                                <div class="task-detail__btn-box">
                                  <button class="complete-btn default-btn">完了</button>
                                </div>
                              </div>
                            </li>`;
    $('.message').remove();
    $('.tasks-list').append(taskCardTemplate);
    judgePriority();
  }
  
  function judgePriority() {
    $('.priority-text:contains("3")').text('高').css('color', 'rgb(199, 12, 12)');
    $('.priority-text:contains("2")').text('中').css('color', 'rgb(231, 180, 39)');
    $('.priority-text:contains("1")').text('低').css('color', '#5353b6');
  }
  
  function saveTask(receivedTask, receivedDeadline, receivedPriority) {
    let taskObject = {
      task: receivedTask, 
      deadline: receivedDeadline,
      priority: receivedPriority
    };
  
    taskArray.push(taskObject);
    saveStorage();
    countTask();
  }
  
  function saveStorage() {
    localStorage.setItem('savedTask', JSON.stringify(taskArray));
  }
  
  function readStorage() {
    let storageData = JSON.parse(localStorage.getItem('savedTask'));
    if(storageData === null) {
      showMessage();
    } else {
      taskArray = storageData;
      showAllTask();
    }
    countTask();
  }
  
  function showAllTask() {
    $('.tasks-list').empty();
    $.each(taskArray, function(index, data) {
      addList(data.task, data.deadline, data.priority);
    });
  }
  
  function countTask() {
    let showCount = `<p><span class="strong">タスクの合計 :</span> ${taskArray.length}</p>`;
    $('.task-count p').remove();
    $('.task-count').append(showCount);
  }
  
  function clean() {
    localStorage.clear();
    taskArray = [];
    showMessage();
  }
  
  function showMessage() {
    $('.tasks-list').empty();
    let message = `<li class ="message is-align-center">タスクはありません。フォームからタスクを作成しましょう！</li>`;
    $('.tasks-list').append(message);
  }
  
  function sortSoon() {
    taskArray.sort(function(a, b) {
      if(a.deadline < b.deadline) return -1;
      if(a.deadline > b.deadline) return +1;
      return 0;
    });
    saveStorage();
    showAllTask();
  }
  
  function sortPriority() {
    taskArray.sort(function(a, b) {
      return b.priority - a.priority;
    });
    saveStorage();
    showAllTask();
  }
});