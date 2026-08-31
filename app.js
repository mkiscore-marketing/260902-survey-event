(function () {
  "use strict";

  var QUESTIONS = [
    {
      q: "엠키스코어는 HPE 파트너사입니다. 다음 중 엠키스코어의 HPE 파트너 등급에 해당하는 것은?",
      options: ["플래티넘", "골드", "실버"],
      correct: 0,
      explain: "엠키스코어는 HPE 파트너 프로그램 내 최상위 등급인 플래티넘 파트너입니다."
    },
    {
      q: "대규모 GPU 클러스터 구축 시 고려해야 하는 사항은?",
      options: ["전력", "냉각", "모니터링 솔루션", "모두 다"],
      correct: 3,
      explain: "전력, 냉각, 모니터링 솔루션 세 가지가 함께 관리돼야 안정적으로 운영됩니다. 엠키스코어의 M-OWL은 AI/HPC 클러스터를 한 화면에서 모니터링하는 자체 솔루션으로, GS 1등급 인증도 받았습니다."
    },
    {
      q: "엠키스코어는 NIPA 국가 AI 컴퓨팅센터 1차 구축 성과를 보유한 검증된 AI Factory Partner다.",
      options: ["O", "X"],
      correct: 0,
      explain: "위 프로젝트는 엠키스코어가 직접 설계, 구축, 최적화 및 안정화한 사례입니다. 국가 AI 컴퓨팅 센터 1차 사업은 현 시점에서 국내 최대 규모의 수랭 GPU 클러스터입니다."
    },
    {
      q: "엠키스코어가 구축한 국내 최대 규모 B200 GPU 기반 AI 데이터센터의 총 GPU 수는?",
      options: ["4,080", "5,120", "6,400", "7,656"],
      correct: 3,
      explain: "NIPA 국가 AI 컴퓨팅 센터(1차)는 국내 최대 규모의 B200 GPU 기반 AI 인프라로, 총 7,656장의 GPU를 운영합니다. 이 중 510개 노드로 구성된 단일 클러스터는 4,080장 규모로, 이 역시 국내 최대 규모입니다."
    },
    {
      q: "세계 슈퍼컴퓨터 순위 TOP500에 이름을 올린 국내 AI 슈퍼컴퓨터 중에는 엠키스코어가 구축한 시스템도 있다. (순위 포함 20위)",
      options: ["O", "X"],
      correct: 0,
      explain: "NIPA 국가 AI 컴퓨팅센터의 CL-1은 시스템 성능 효율 87.8%를 선보이며, 2026년 6월 TOP500에서 20위에 등재되었습니다."
    }
  ];

  var SURVEY_STEPS = [
    {
      title: "기본 정보",
      fields: [
        { key: "company", label: "소속 회사", type: "text", required: true },
        { key: "name", label: "성함", type: "text", required: true },
        { key: "email", label: "이메일", type: "email", required: true, ph: "회사 이메일 주소 입력 부탁드립니다." },
        { key: "role", label: "담당 업무", type: "text", required: false },
        { key: "department", label: "부서", type: "text", required: false },
        { key: "title", label: "직책", type: "text", required: false },
        { key: "phone", label: "휴대전화번호", type: "tel", required: true, ph: "010-1234-5678 형식으로 입력 부탁드립니다." }
      ]
    },
    {
      title: "회사 프로필",
      fields: [
        { key: "decisionAuthority", label: "의사결정권한", type: "radio", required: false,
          options: ["CFO, CEO, COO, CTO", "예산집행 담당", "타부서 리더(팀장급)", "구매부서 팀원", "해당 없음"] },
        { key: "companySize", label: "회사 규모", type: "radio", required: false,
          options: ["대기업", "중견/중소기업", "스타트업"] },
        { key: "itBudget", label: "연간 IT 구매 예산 규모", type: "radio", required: false,
          options: ["100억 원 이상", "50억 원 이상", "30억 원 이상", "20억 원 이상", "10억 원 이상", "5억 원 이상", "3억 원 미만", "1억 원 미만", "모름 또는 없음"] }
      ]
    },
    {
      title: "관심사",
      fields: [
        { key: "interestAreas", label: "관심 분야 (복수 응답 가능)", type: "checkbox", required: false,
          options: ["연구개발", "데이터 분석 및 활용", "Physical AI", "AI Factory", "생성형 AI", "HPC 및 AI Simulation", "AI 학습 및 추론", "기타"] },
        { key: "interestProducts", label: "관심 제품 (복수 응답 가능)", type: "checkbox", required: false,
          options: ["8GPU Server (B200, B300)", "Rack 서버 (GB300, Vera Rubin...)", "IB Switch", "RTX Pro 6000 GPU Server", "해당 없음"] }
      ]
    },
    {
      title: "도입 계획",
      fields: [
        { key: "adoptionIntent", label: "도입의사", type: "radio", required: false,
          options: ["도입의사 있음", "도입의사 없음", "도입 검토중 (구매부서 협의 전)", "미확정 (정보확인 목적)", "미확정 (사전조사 목적)"] },
        { key: "adoptionTimeline", label: "도입 시점", type: "radio", required: false,
          options: ["1~2개월 이내 (긴급도입)", "3개월 이내", "6개월 이내", "1년 이내", "1년 이후", "미정", "계획없음"] },
        { key: "consult", label: "추후 엠키스코어 영업으로부터 상담을 희망하십니까?", type: "radio", required: false,
          options: ["예", "아니오"] }
      ]
    }
  ];

  var LS_DRAFT = "mki_quiz_draft_v2";
  var LS_FAILED = "mki_failed_submissions_v2";
  var MAX_RETRIES = 3;
  var CONFIG = window.MKI_CONFIG || {};

  var state = {
    screen: "intro",
    qIndex: 0,
    answered: [false, false, false, false, false],
    surveyStep: 0,
    survey: {}
  };

  function uid() {
    return "r_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
  }

  function saveDraft() {
    try { localStorage.setItem(LS_DRAFT, JSON.stringify(state)); } catch (e) {}
  }
  function loadDraft() {
    try { return JSON.parse(localStorage.getItem(LS_DRAFT)); } catch (e) { return null; }
  }
  function clearDraft() {
    try { localStorage.removeItem(LS_DRAFT); } catch (e) {}
  }

  function getFailedSubmissions() {
    try { return JSON.parse(localStorage.getItem(LS_FAILED) || "[]"); } catch (e) { return []; }
  }
  function setFailedSubmissions(list) {
    try { localStorage.setItem(LS_FAILED, JSON.stringify(list)); } catch (e) {}
  }

  var app = document.getElementById("app");

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
    });
  }

  function topbar(labelText, current, total) {
    var pct = total ? Math.round((current / total) * 100) : 0;
    return '<div class="topbar">' +
      '<div class="topbar-row"><span class="brand">mkiscore <span>·</span> HPE Cray AI 2026</span>' +
      (total ? '<span class="step-label">' + escapeHtml(labelText) + " " + current + "/" + total + "</span>" : "") +
      "</div>" +
      (total ? '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' : "") +
      "</div>";
  }

  function render() {
    app.innerHTML = "";
    if (state.screen === "intro") return renderIntro();
    if (state.screen === "quiz") return renderQuiz();
    if (state.screen === "survey") return renderSurvey();
    if (state.screen === "submitting") return renderSubmitting();
    if (state.screen === "thanks") return renderThanks();
    if (state.screen === "admin") return renderAdmin();
  }

  function renderIntro() {
    app.appendChild(el(
      '<div class="shell">' +
        topbar("", 0, 0) +
        '<div class="content"><div class="card">' +
          '<p class="eyebrow">부스 퀴즈 이벤트</p>' +
          "<h1>국내 최대 규모 AI Factory를 만든 엠키스코어를 퀴즈로 만나보세요</h1>" +
          '<p class="lede">백월 전시 콘텐츠를 바탕으로 한 5개 문항을 풀고 간단한 설문에 참여하시면, 엠키스코어 스태프에게 기념품을 받아가실 수 있습니다. 소요 시간은 3~5분입니다.</p>' +
          '<button class="btn btn-primary" id="btn-start">퀴즈 풀고 기념품 받아가세요</button>' +
        "</div></div>" +
        '<div class="foot-link"><button id="btn-staff" type="button">스태프 화면</button></div>' +
      "</div>"
    ));
    document.getElementById("btn-start").addEventListener("click", function () {
      state.screen = "quiz";
      state.qIndex = 0;
      saveDraft();
      render();
    });
    document.getElementById("btn-staff").addEventListener("click", function () {
      state.screen = "admin";
      render();
    });
  }

  function renderQuiz() {
    var idx = state.qIndex;
    var item = QUESTIONS[idx];
    var isAnswered = state.answered[idx];

    var optsHtml = item.options.map(function (opt, i) {
      return '<button class="opt" data-i="' + i + '">' + escapeHtml(opt) + "</button>";
    }).join("");

    app.appendChild(el(
      '<div class="shell">' +
        topbar("문항", idx + 1, QUESTIONS.length) +
        '<div class="content"><div class="card">' +
          "<h2>" + escapeHtml(item.q) + "</h2>" +
          '<div class="opt-list" id="opt-list">' + optsHtml + "</div>" +
          '<p class="hint" id="hint"></p>' +
          '<div id="explain-slot"></div>' +
        "</div></div>" +
      "</div>"
    ));

    var optButtons = Array.prototype.slice.call(document.querySelectorAll("#opt-list .opt"));
    var hint = document.getElementById("hint");

    if (isAnswered) {
      showAnswered();
    }

    optButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (state.answered[idx]) return;
        var i = Number(btn.getAttribute("data-i"));
        if (i === item.correct) {
          state.answered[idx] = true;
          saveDraft();
          showAnswered();
        } else {
          btn.classList.add("wrong");
          hint.textContent = "다시 한 번 골라보세요.";
          setTimeout(function () { btn.classList.remove("wrong"); }, 500);
        }
      });
    });

    function showAnswered() {
      optButtons.forEach(function (btn, i) {
        if (i === item.correct) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("dim");
        }
      });
      hint.textContent = "";
      var slot = document.getElementById("explain-slot");
      var isLast = idx === QUESTIONS.length - 1;
      slot.innerHTML =
        '<div class="explain"><strong>정답 해설</strong>' + escapeHtml(item.explain) + "</div>" +
        '<div class="btn-row"><button class="btn btn-primary" id="btn-next">' +
        (isLast ? "설문 시작하기" : "다음 문항") +
        "</button></div>";
      document.getElementById("btn-next").addEventListener("click", function () {
        if (isLast) {
          state.screen = "survey";
          state.surveyStep = 0;
        } else {
          state.qIndex = idx + 1;
        }
        saveDraft();
        render();
      });
    }
  }

  function fieldHtml(f, value) {
    if (f.type === "text" || f.type === "email" || f.type === "tel") {
      var v = value ? escapeHtml(value) : "";
      return '<div class="field" data-key="' + f.key + '">' +
        "<label>" + escapeHtml(f.label) + (f.required ? '<span class="req">*</span>' : "") + "</label>" +
        '<input type="' + f.type + '" data-key="' + f.key + '" value="' + v + '">' +
        (f.ph ? '<div class="ph">' + escapeHtml(f.ph) + "</div>" : "") +
        '<div class="err">' + (f.type === "email" ? "이메일 주소를 입력해 주세요." : f.type === "tel" ? "연락 가능한 휴대전화번호를 입력해 주세요." : "필수 입력 항목입니다.") + "</div>" +
      "</div>";
    }
    if (f.type === "radio") {
      var chips = f.options.map(function (opt) {
        var checked = value === opt ? " checked" : "";
        return '<label class="chip"><input type="radio" name="' + f.key + '" value="' + escapeHtml(opt) + '"' + checked + "><span>" + escapeHtml(opt) + "</span></label>";
      }).join("");
      return '<div class="field" data-key="' + f.key + '">' +
        "<label>" + escapeHtml(f.label) + "</label>" +
        '<div class="chip-group">' + chips + "</div>" +
      "</div>";
    }
    if (f.type === "checkbox") {
      var selected = Array.isArray(value) ? value : [];
      var boxes = f.options.map(function (opt) {
        var checked = selected.indexOf(opt) > -1 ? " checked" : "";
        return '<label class="chip"><input type="checkbox" data-group="' + f.key + '" value="' + escapeHtml(opt) + '"' + checked + "><span>" + escapeHtml(opt) + "</span></label>";
      }).join("");
      return '<div class="field" data-key="' + f.key + '">' +
        "<label>" + escapeHtml(f.label) + "</label>" +
        '<div class="chip-group">' + boxes + "</div>" +
      "</div>";
    }
    return "";
  }

  function renderSurvey() {
    var stepIdx = state.surveyStep;
    var step = SURVEY_STEPS[stepIdx];
    var fieldsHtml = step.fields.map(function (f) {
      return fieldHtml(f, state.survey[f.key]);
    }).join("");
    var isLast = stepIdx === SURVEY_STEPS.length - 1;

    app.appendChild(el(
      '<div class="shell">' +
        topbar("설문", stepIdx + 1, SURVEY_STEPS.length) +
        '<div class="content"><div class="card">' +
          "<h2>" + escapeHtml(step.title) + "</h2>" +
          '<div id="fields">' + fieldsHtml + "</div>" +
          '<div class="btn-row">' +
            (stepIdx > 0 ? '<button class="btn btn-ghost" id="btn-back">이전</button>' : "") +
            '<button class="btn btn-primary" id="btn-fwd">' + (isLast ? "제출하기" : "다음") + "</button>" +
          "</div>" +
        "</div></div>" +
      "</div>"
    ));

    step.fields.forEach(function (f) {
      if (f.type === "text" || f.type === "email" || f.type === "tel") {
        var input = document.querySelector('input[data-key="' + f.key + '"]');
        input.addEventListener("input", function () {
          state.survey[f.key] = input.value;
        });
      } else if (f.type === "radio") {
        var radios = document.querySelectorAll('input[name="' + f.key + '"]');
        radios.forEach(function (r) {
          r.addEventListener("change", function () {
            state.survey[f.key] = r.value;
          });
        });
      } else if (f.type === "checkbox") {
        var boxes = document.querySelectorAll('input[data-group="' + f.key + '"]');
        boxes.forEach(function (b) {
          b.addEventListener("change", function () {
            var cur = Array.isArray(state.survey[f.key]) ? state.survey[f.key].slice() : [];
            if (b.checked) {
              if (cur.indexOf(b.value) === -1) cur.push(b.value);
            } else {
              cur = cur.filter(function (v) { return v !== b.value; });
            }
            state.survey[f.key] = cur;
          });
        });
      }
    });

    if (stepIdx > 0) {
      document.getElementById("btn-back").addEventListener("click", function () {
        state.surveyStep = stepIdx - 1;
        saveDraft();
        render();
      });
    }

    document.getElementById("btn-fwd").addEventListener("click", function () {
      if (!validateStep(step)) return;
      if (isLast) {
        submitSurvey();
      } else {
        state.surveyStep = stepIdx + 1;
        saveDraft();
        render();
      }
    });
  }

  function validateStep(step) {
    var ok = true;
    step.fields.forEach(function (f) {
      if (!f.required) return;
      var val = state.survey[f.key];
      var invalid = false;
      if (f.type === "email") {
        invalid = !val || val.indexOf("@") === -1;
      } else if (f.type === "tel") {
        invalid = !val || val.replace(/[^0-9]/g, "").length < 9;
      } else {
        invalid = !val || !String(val).trim();
      }
      var fieldEl = document.querySelector('.field[data-key="' + f.key + '"]');
      if (fieldEl) fieldEl.classList.toggle("invalid", invalid);
      if (invalid) ok = false;
    });
    return ok;
  }

  function buildRecord() {
    var s = state.survey;
    return {
      id: uid(),
      submittedAt: new Date().toISOString(),
      company: s.company || "",
      name: s.name || "",
      email: s.email || "",
      role: s.role || "",
      department: s.department || "",
      title: s.title || "",
      phone: s.phone || "",
      decisionAuthority: s.decisionAuthority || "",
      companySize: s.companySize || "",
      itBudget: s.itBudget || "",
      interestAreas: s.interestAreas || [],
      interestProducts: s.interestProducts || [],
      adoptionIntent: s.adoptionIntent || "",
      adoptionTimeline: s.adoptionTimeline || "",
      consult: s.consult || ""
    };
  }

  function submitSurvey() {
    var record = buildRecord();
    clearDraft();
    state.screen = "submitting";
    render();
    sendRecord(record, 0).then(function () {
      state.screen = "thanks";
      render();
    }).catch(function () {
      var failed = getFailedSubmissions();
      failed.push(record);
      setFailedSubmissions(failed);
      state.screen = "thanks";
      state.saveFailed = true;
      render();
    });
  }

  function sendRecord(record, attempt) {
    if (!CONFIG.APPS_SCRIPT_URL) {
      return Promise.reject(new Error("no apps script url configured"));
    }
    return fetch(CONFIG.APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(record)
    }).then(function (res) {
      if (!res.ok) throw new Error("bad status " + res.status);
      return res;
    }).catch(function (err) {
      if (attempt < MAX_RETRIES) {
        return new Promise(function (resolve) { setTimeout(resolve, 600 * (attempt + 1)); })
          .then(function () { return sendRecord(record, attempt + 1); });
      }
      throw err;
    });
  }

  function renderSubmitting() {
    app.appendChild(el(
      '<div class="shell">' +
        topbar("", 0, 0) +
        '<div class="content"><div class="card" style="align-items:center;text-align:center;display:flex;flex-direction:column;">' +
          '<div class="spinner"></div>' +
          "<p class=\"lede\" style=\"margin:0;\">응답을 저장하고 있습니다...</p>" +
        "</div></div>" +
      "</div>"
    ));
  }

  function renderThanks() {
    var checkSvg = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13l4 4L19 7" stroke="var(--good)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var note = state.saveFailed
      ? '<p class="lede" style="margin-top:14px;">네트워크 상태로 자동 저장이 지연될 수 있습니다. 스태프에게 알려주시면 확인해 드립니다.</p>'
      : "";
    app.appendChild(el(
      '<div class="shell">' +
        topbar("", 0, 0) +
        '<div class="content"><div class="card">' +
          '<div class="thanks-icon">' + checkSvg + "</div>" +
          "<h1>설문 이벤트에 참여해주셔서 감사합니다</h1>" +
          '<p class="lede">엠키스코어가 구축한 AI 인프라에 관심 가져주셔서 감사합니다.</p>' +
          '<div class="staff-box"><p class="label">엠키스코어 스태프 확인용</p><p>이 화면을 스태프에게 보여주시면 기념품을 드립니다.</p></div>' +
          note +
        "</div></div>" +
      "</div>"
    ));
    state.saveFailed = false;
  }

  function renderAdmin() {
    var failed = getFailedSubmissions();

    var rows = failed.map(function (r) {
      return "<tr><td>" + escapeHtml((r.submittedAt || "").replace("T", " ").slice(0, 16)) + "</td>" +
        "<td>" + escapeHtml(r.company) + "</td>" +
        "<td>" + escapeHtml(r.name) + "</td>" +
        "<td>" + escapeHtml(r.email) + "</td>" +
        "<td>" + escapeHtml(r.phone) + "</td></tr>";
    }).join("");

    app.appendChild(el(
      '<div class="shell">' +
        topbar("", 0, 0) +
        '<div class="content"><div class="card">' +
          '<p class="eyebrow">스태프 전용</p>' +
          "<h1>응답 현황</h1>" +
          '<p class="admin-note">모든 응답은 제출과 동시에 구글시트 "7. 설문 이벤트 응답 내용" 시트에 실시간으로 저장됩니다. 아래 버튼으로 구글시트를 열어 실시간 응답 현황을 확인해 주세요.</p>' +
          '<div class="btn-row" style="margin-top:0;margin-bottom:22px;"><a class="btn btn-primary" id="btn-sheet" href="' + escapeHtml(CONFIG.SHEET_URL || "#") + '" target="_blank" rel="noopener">구글시트 열기</a></div>' +
          (failed.length
            ? '<div class="admin-summary"><span class="num">' + failed.length + '</span><span class="step-label">이 기기에서 저장 실패한 응답</span></div>' +
              '<p class="admin-note">네트워크 문제로 구글시트에 자동 저장되지 못한 응답입니다. 아래 버튼으로 다시 전송을 시도해 주세요.</p>' +
              '<div class="table-wrap"><table><thead><tr><th>제출시각</th><th>회사</th><th>성함</th><th>이메일</th><th>연락처</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
              '<div class="btn-row" style="margin-top:0;"><button class="btn btn-ghost" id="btn-retry">다시 전송 시도</button></div>'
            : "") +
        "</div></div>" +
        '<div class="foot-link"><button id="btn-exit" type="button">참가자 화면으로 돌아가기</button></div>' +
      "</div>"
    ));

    if (failed.length) {
      document.getElementById("btn-retry").addEventListener("click", function () {
        Promise.all(failed.map(function (r) { return sendRecord(r, 0).then(function () { return r.id; }).catch(function () { return null; }); }))
          .then(function (succeededIds) {
            var stillFailed = failed.filter(function (r) { return succeededIds.indexOf(r.id) === -1; });
            setFailedSubmissions(stillFailed);
            render();
          });
      });
    }

    document.getElementById("btn-exit").addEventListener("click", function () {
      state.screen = "intro";
      render();
    });
  }

  function init() {
    if (location.hash === "#staff") {
      state.screen = "admin";
      render();
      return;
    }

    var draft = loadDraft();
    if (draft && draft.screen && draft.screen !== "thanks" && draft.screen !== "submitting" && draft.screen !== "admin") {
      state = draft;
      render();
      return;
    }

    render();
  }

  init();
})();
