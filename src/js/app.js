$(function () {
  let taskArray = [];
  let storageKey = 'savedTask';
  let storageData = JSON.parse(localStorage.getItem(storageKey));
  let getTaskCard;
  
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
    getTaskCard = $(this).closest('.task-card');
    let taskCardIndex = getTaskCard.index();

    getTaskCard.remove();
    taskArray.splice(taskCardIndex, 1);
    saveStorage();
    if(taskArray.length === 0) {
      localStorage.clear();
      showMessage();
    }
    countTask();
  });

  $('.clean-all-task').on('click', function() {
    //task-listの子要素削除、localStorage、taskArrayのデータを初期化
    if (taskArray.length === 0) {
      showAlert();
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
          localStorage.clear();
          taskArray = [];
          showMessage();
          countTask();
        }
      });
    }
  });

  $('.soon').click(function () {
    if (taskArray.length === 0) {
      return false;
    } else {
      sortSoon();
      saveStorage();
      showAllTask();
    }
  });

  $('.late').click(function () {
    if (taskArray.length === 0) {
      return false;
    } else {
      sortlate();
      saveStorage();
      showAllTask();
    }
  });

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
    localStorage.setItem(storageKey, JSON.stringify(taskArray));
  }

  function readStorage() {
    if(storageData === null) {
      showMessage();
    } else {
      taskArray=storageData; //ページを読み込んだ際に、既にlocalStorageにデータがあればtaskArrayに代入
      showAllTask();
    }
    countTask();
  }

  function countTask() {
    let showCount = `<p><span class="strong">タスクの合計 :</span> ${taskArray.length}</p>`;
    $('.task-count p').remove();
    $('.task-count').append(showCount);
  }

  function showMessage() {
    $('.tasks-list').empty();
    let message = `<li class ="message is-align-center">タスクはありません。フォームからタスクを作成しましょう！</li>`
    $('.tasks-list').append(message);
  }

  function showAlert() {
    swal.fire({
      text: "タスクはありません",
      icon: "info"
    });
  }

  function addList(receivedTask, receivedDeadline, receivedPriority) {
    let taskCardTemplate = `<li class="task-card">
                              <div class="task-name card-inner">${receivedTask}</div>
                              <div class="task-detail card-inner">
                                <div class="task-detail__text-box">
                                  <div class="detail-text">
                                    <p><span class="strong">優先度：</span>${receivedPriority}</p>
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
  }

  function showAllTask() {
    $('.tasks-list').empty();
    $.each(taskArray, function(index, data) {
      addList(data.task, data.deadline, data.priority);
    });
  }

  function sortSoon() {
    let soon = taskArray.sort(function(a, b) {
      if(a.deadline < b.deadline) return -1;
      if(a.deadline > b.deadline) return +1;
      return 0;
    });
    taskArray = soon;
  }

  function sortlate() {
    let late = taskArray.sort(function(a, b) {
      if(a.deadline < b.deadline) return +1;
      if(a.deadline > b.deadline) return -1;
      return 0;
    });
    taskArray = late;
  }
});