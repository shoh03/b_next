1. project 에서 main으로 pull 받아줘.
2. pull 받은 main 브랜치를 origin으로 push해줘.

---
description: project remote의 main을 로컬 main으로 pull한 뒤 origin에 push
---

# Pull 작업

`project` remote의 `main`을 로컬 `main`으로 pull 받고, 그 결과를 `origin`에 push해 줘.

## 사전 확인

- `project`와 `origin` remote가 모두 연결되어 있는지 확인한다. 하나라도 없으면 작업하지 말고 알려준다.
- 커밋되지 않은 변경 사항이 있으면 작업하지 말고 먼저 알려준다.
- 현재 브랜치가 `main`이 아니면 `main`으로 전환한다.

```bash
git checkout main
```

## 작업 순서

### 1. project에서 main으로 pull

```bash
git pull project main
```

- 충돌이 나면 임의로 해결하지 말고, 충돌난 파일 목록을 알려주고 어떻게 할지 물어본다.
- 받을 커밋이 없으면(이미 최신이면) 알려주고 2단계로 넘어간다.

### 2. main을 origin으로 push

```bash
git push origin main
```

- `main`에 upstream이 설정되지 않았다면 `-u` 옵션으로 upstream을 함께 설정한다.

```bash
git push -u origin main
```

### 3. 결과 보고

- pull 받은 커밋 범위와 push한 커밋 범위를 알려준다.
- 실패하면 에러 메시지와 원인을 알려준다.

## 주의 사항

- `--force` / `--force-with-lease`는 사용자가 명시적으로 요청한 경우에만 사용한다.
- `origin`에 새 커밋이 있어 push가 거부되면, 임의로 pull/rebase하지 말고 먼저 사용자에게 어떻게 할지 물어본다.
