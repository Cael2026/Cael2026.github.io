document.addEventListener('DOMContentLoaded', function() {
    const zhenbangBtn = document.getElementById('zhenbangBtn');
    const tipsBtn = document.getElementById('tipsBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('closeBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const nextTipBtn = document.getElementById('nextTipBtn');
    const trickAudio = document.getElementById('trickAudio');

    // Tips 数据池
    const tipsPool = [
        { text: "事实上，敬业从来不起飞。" },
        { text: "你知道吗？作为振邦大陆首都的永谐市，城市化区域却远远不如滨州市。" },
        { text: "干得真棒。" },
        { text: "你被骗了！", img: "trick.gif" },
        { text: "经典表情大放送：", faces: true }
    ];

    let availableTips = [];
    let currentIsTrick = false;

    // 洗牌函数
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // 获取随机 Tip（抽完洗牌）
    function getRandomTip() {
        if (availableTips.length === 0) {
            availableTips = shuffle([...tipsPool]);
        }
        return availableTips.pop();
    }

    // 停止音乐
    function stopMusic() {
        if (trickAudio) {
            trickAudio.pause();
            trickAudio.currentTime = 0;
        }
        currentIsTrick = false;
    }

    // 显示弹窗
    function showModal(title, contentHtml, showNext) {
        modalTitle.textContent = title;
        modalContent.innerHTML = contentHtml;
        nextTipBtn.style.display = showNext ? 'inline-block' : 'none';
        modalOverlay.classList.add('show');
    }

    // 渲染 Tip 内容
    function renderTip(tip) {
        // 若新 Tip 不是你被骗了，则停掉旧音乐
        if (!tip.img && trickAudio && currentIsTrick) {
            stopMusic();
        }

        let contentHtml = `<p>${tip.text}</p>`;
        if (tip.img) {
            contentHtml += `<img src="${tip.img}" alt="GIF 动图">`;
            // 刷出"你被骗了"，播放音乐（仅在首次出现时触发）
            if (!currentIsTrick) {
                currentIsTrick = true;
                trickAudio.play().catch(function(err) {
                    console.warn('音乐播放被浏览器拦截：', err);
                });
            }
        } else if (tip.faces) {
            contentHtml += `
                <div class="face-grid">
                    <img src="face1.jpg" alt="表情1">
                    <img src="face2.jpg" alt="表情2">
                    <img src="face3.jpg" alt="表情3">
                    <img src="face4.jpg" alt="表情4">
                </div>
            `;
        }

        showModal('Tips', contentHtml, true);
    }

    // 一键振邦
    zhenbangBtn.addEventListener('click', function () {
        stopMusic();
        showModal('干得振邦！', '', false);
    });

    // 获取 Tips
    tipsBtn.addEventListener('click', function () {
        renderTip(getRandomTip());
    });

    // 再来一条（不影响音乐播放）
    nextTipBtn.addEventListener('click', function () {
        renderTip(getRandomTip());
    });

    // 关闭弹窗（停止音乐）
    function closeModal() {
        stopMusic();
        modalOverlay.classList.remove('show');
    }

    closeBtn.addEventListener('click', closeModal);

    // 点击遮罩关闭（停止音乐）
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});
