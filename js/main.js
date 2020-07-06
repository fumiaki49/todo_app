$(function () {
  var taskArray = [];
  var storageKey = 'savedTask';
  var storageData = JSON.parse(localStorage.getItem(storageKey));

  readStorage();

  $('form').submit( function(e) {
    e.preventDefault();
    var taskData = $('#task').val();
    var deadlineData = $('#deadline').val();
    var priorityData = $('input[name=priority]:checked').val();
    addList(taskData, deadlineData, priorityData);
    saveTask(taskData, deadlineData, priorityData);
  });

  $(document).on('click', '.delete-btn', function() {
    var getTaskCard = $(this).closest('.task-card');
    var taskCardIndex = getTaskCard.index();
    getTaskCard.remove();
    taskArray.splice(taskCardIndex, 1);
    saveStorage();
    if(taskArray.length === 0) {
      localStorage.clear();
      showMessage();
    }
  })

  $('.clean-all-task').on('click', function() {
    //task-listの子要素削除、localStorage、taskArrayのデータを初期化
    $('.tasks-list').empty();
    localStorage.clear();
    taskArray = [];
    showMessage();
  });

  function saveTask(receivedTask, receivedDeadline, receivedPriority) {
    var taskObject = {
      task: receivedTask, 
      deadline: receivedDeadline,
      priority: receivedPriority
    };
    taskArray.push(taskObject);
    saveStorage();
  };

  function saveStorage() {
    localStorage.setItem(storageKey, JSON.stringify(taskArray));
  };

  function readStorage() {
    if(storageData === null) {
      showMessage();
    } else {
      taskArray=storageData; //ページを読み込んだ際に、既にlocalStorageにデータがあればtaskArrayに代入
      $.each(storageData, function(index, data) {
        addList(data.task, data.deadline, data.priority);
      });
    }
  };

  function showMessage() {
    var message = `<li class ="message is-align-center">フォームから情報を入力してタスクを管理しましょう！</li>`
    $('.tasks-list').append(message);
  };

  function addList(receivedTask, receivedDeadline, receivedPriority) {
    var taskCardTemplate = `<li class="task-card">
                              <div class="task-name card-inner">${receivedTask}</div>
                              <div class="task-detail card-inner">
                                <div class="task-detail__text-box">
                                  <div class="task-detail__text-box__detail-text">
                                    <p><span class="strong">優先度：</span>${receivedPriority}</p>
                                  </div>
                                  <div class="task-detail__text-box__detail-text">
                                    <p><span class="strong">期限：</span>${receivedDeadline}</p>
                                  </div>
                                </div>
                                <div class="task-detail__btn-box">
                                  <label class="compleate-btn">
                                    <input type="checkbox">
                                    <span>完了</span>
                                  </label>
                                  <button class="delete-btn default-btn">
                                    <i class="fas fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </li>`
    $('.message').remove();
    $('.tasks-list').append(taskCardTemplate);
    $('#task').val('');
    $('#deadline').val('');
  };
});