---
description: .gitignore 생성, origin 연결, prefix 규칙에 맞춘 커밋까지 순서대로 수행
argument-hint: <커밋 메시지 내용>
---

# Commit 작업

아래 순서대로 commit 작업을 진행해 줘.

## 사전 조건 (생략 규칙)

- `.gitignore` 파일이 이미 있으면 **1단계를 생략**한다.
- `origin` remote가 이미 연결되어 있으면 **2단계를 생략**한다.
- git 저장소가 아니면 먼저 `git init`을 실행한다.

## 작업 순서

### 1. `.gitignore` 생성

다음 항목을 모두 포함한다.

- **에디터/IDE**: VSCode(`.vscode/`), JetBrains(`.idea/`) 등
- **macOS**: `.DS_Store`, `.AppleDouble`, `.LSOverride`, `._*` 등
- **Windows**: `Thumbs.db`, `ehthumbs.db`, `Desktop.ini`, `$RECYCLE.BIN/` 등
- **환경변수 파일**: `.env`, `.env.*`, `*.local` 등 (단, `.env.example`은 커밋 대상으로 유지)
- **기타 일반 항목**: 로그(`*.log`), 의존성 폴더(`node_modules/`), 빌드 산출물(`dist/`, `build/`) 등

### 2. remote 연결

- remote 이름: `origin`
- 주소: `https://github.com/shoh03/a_commands.git`

```bash
git remote add origin https://github.com/shoh03/a_commands.git
```

### 3. 커밋

- 변경 내용을 확인한 뒤, 아래 prefix 규칙 중 가장 적절한 것을 골라 커밋 메시지를 작성한다.
- 커밋 메시지 내용: `$ARGUMENTS`
- 형식: `<prefix>: <메시지>`

## 커밋 prefix 규칙

| prefix | 용도 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 (README 등) |
| `style` | 코드 포맷 변경 (세미콜론, 공백 등) |
| `refactor` | 리팩토링 (기능 변화 없음) |
| `test` | 테스트 코드 추가/수정 |
| `chore` | 빌드, 설정, 패키지, 기타 작업 |
| `perf` | 성능 개선 |
| `ci` | CI 설정 수정 |
| `build` | 빌드 시스템 수정 |
| `revert` | 커밋 되돌리기 |

## 커밋 메시지 예시 (Few-shot)

| 입력(`$ARGUMENTS`) | 생성된 커밋 메시지 |
| --- | --- |
| 로그인 기능 추가 | `feat: 로그인 기능 추가` |
| 회원가입 시 이메일 중복 체크 오류 수정 | `fix: 회원가입 시 이메일 중복 체크 오류 수정` |
| README 설치 방법 보완 | `docs: README 설치 방법 보완` |
| gitignore 추가 및 초기 설정 | `chore: gitignore 추가 및 초기 설정` |
| 목록 조회 쿼리 최적화 | `perf: 목록 조회 쿼리 최적화` |
| GitHub Actions 배포 워크플로 수정 | `ci: GitHub Actions 배포 워크플로 수정` |
