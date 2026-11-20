---
paths:
  - "app/**/*.{ts,tsx}"
  - "components/**/*.{ts,tsx}"
  - "providers/**/*.{ts,tsx}"
  - "stores/**/*.ts"
  - "hooks/**/*.ts"
  - "api/**/*.ts"
  - "types/**/*.ts"
  - "enums/**/*.ts"
  - "lib/**/*.ts"
  - "styles/**/*.{ts,css}"
  - "middleware.ts"
---

<!-- 프론트엔드 규칙 -->

# Frontend Rules

## 1. 스택 및 버전
- Next.js 16 (App Router), React 19, TypeScript (strict)
- 스타일링: **tailwindcss만 사용** (Tailwind v4, `app/globals.css`의 `@theme`으로 테마 정의)
- UI 기반: shadcn (`components.json`, style `base-nova`), `@base-ui/react`, `class-variance-authority`, `lucide-react` 아이콘
- 클라이언트 상태 관리: zustand
- 서버 상태 관리: @tanstack/react-query
- 폼: react-hook-form
- 폰트: `next/font` (Pretendard: `styles/font/font.ts`, Geist: `app/layout.tsx`)
- 들여쓰기: **4칸** (`.claude/CLAUDE.md`)
- 버전은 현재 `package.json`에 명시된 버전을 유지한다. 최신 버전으로 강제 업데이트하지 않는다.

## 2. 프로젝트 구조

루트 기준 각 폴더의 역할이다. 기존 폴더 구조는 변경하지 않는다.

```
b_next/
├── app/                    # App Router (라우트, 레이아웃, 페이지)
│   ├── layout.tsx          # 루트 레이아웃 (폰트, ReactQueryProvider 등록)
│   ├── page.tsx            # "/" 페이지
│   ├── globals.css         # Tailwind 진입점, shadcn 테마 변수, @theme
│   └── comminty/           # 라우트 폴더 (kebab-case)
├── components/
│   ├── ui/                 # shadcn 생성 컴포넌트 (직접 수정 최소화)
│   ├── common/             # 공통 컴포넌트 (Loading, ErrorComponent 등)
│   └── auth/               # 도메인 컴포넌트 (AuthHydration 등)
├── api/                    # 서버 통신 함수 (fetching 함수)  ex) api/user/user.api.ts
├── providers/              # 전역 Provider ("use client")
├── stores/                 # zustand 스토어  ex) stores/useAuthStore.ts
├── hooks/                  # 커스텀 훅 (components.json의 alias "@/hooks"; 필요 시 생성)
├── types/                  # 타입 정의  ex) types/user/user.type.ts
├── enums/                  # enum 정의  ex) enums/default.enum.ts
├── lib/                    # 유틸리티 (cn 등)
├── styles/                 # 폰트 설정, 추가 Tailwind 테마 CSS
├── public/assets/          # 정적 파일 (fonts, images)
├── middleware.ts           # 경로 기반 인증 리다이렉트
└── next.config.ts
```

- 경로 alias: `@/*` → 프로젝트 루트 (`tsconfig.json`). 상대 경로 대신 `@/`를 사용한다.
- 관심사별로 폴더를 나누고, 새 기능은 해당 관심사 폴더에 둔다.

## 3. App Router 규칙
- 라우트 파일은 `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` 등 Next.js 예약 파일명을 사용한다. 일반 `index.tsx`는 라우트가 되지 않는다.
- `app` 밑의 폴더명은 **kebab-case**를 사용한다.
- 라우트 전용 컴포넌트는 해당 라우트 폴더 안의 `_components/`에 둔다 (App Router private 폴더, 라우팅 제외).
- 기본은 **Server Component**다. 상태, 이벤트 핸들러, 브라우저 API, Hooks를 쓰는 파일에만 파일 최상단에 `"use client"`를 선언한다.
- `middleware.ts`의 `config.matcher`에 보호 경로를 추가한다. 쿠키 접근은 서버(middleware)에서, 토큰 기반 상태 확인은 클라이언트에서 처리한다.
- `next.config.ts`의 `cacheComponents: true`, `reactStrictMode: false` 설정을 유지한다.

## 4. 컴포넌트 컨벤션
- **함수형 컴포넌트만 사용한다.** class component 금지.
- 컴포넌트 파일명은 **PascalCase** (`UserProfile.tsx`).
- 하나의 파일에는 **하나의 컴포넌트만 생성**하고, **하나의 컴포넌트만 export**한다.
- Props는 `interface`로 정의하고 이름은 `ComponentNameProps`로 한다. **컴포넌트 함수 상단에 선언**한다.
- 컴포넌트는 `export default`로 내보낸다. 예외: 비컴포넌트 유틸/상수는 named export를 사용한다 (`api/`의 함수 등).

```tsx
// components/common/UserProfile.tsx
interface UserProfileProps {
    name: string;
}

export default function UserProfile({ name }: UserProfileProps) {
    return <p>{name}</p>;
}
```

- `components/ui/`는 shadcn CLI가 생성한다. 파일명이 소문자(`button.tsx`)이고 `buttonVariants`를 함께 export하는 것은 shadcn 생성 규칙에 따른 예외다. 직접 기능을 추가하기보다 `components/` 하위 래퍼 컴포넌트를 만드는 것을 우선한다.
- shadcn 컴포넌트 추가 시 `components.json` 설정(alias `@/components/ui`, `@/lib/utils`)을 따른다.

## 5. 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 파일 | PascalCase | `UserProfile.tsx` |
| 라우트 폴더 | kebab-case | `my-page/` |
| 라우트 전용 컴포넌트 폴더 | `_components/` | `app/my-page/_components/` |
| 커스텀 훅 | `useXxx.ts`, camelCase | `hooks/useMember.ts` |
| zustand 스토어 | `useXxxStore.ts` | `stores/useAuthStore.ts` |
| API 함수 파일 | `<domain>.api.ts` | `api/user/user.api.ts` |
| 타입 파일 | `<domain>.type.ts` | `types/member/member.type.ts` |
| enum 파일 | `<domain>.enum.ts` | `enums/default.enum.ts` |
| Props 타입 | `ComponentNameProps` | `UserProfileProps` |

- 타입/인터페이스 이름은 PascalCase, 응답 DTO는 `XxxDTO` 접미사를 사용한다 (`ApiResponseDTO`, `MemberDTO`).
- 관심사 폴더 내부 파일은 해당 관심사에 맞춰 `<이름>.<관심사>.ts` 형식으로 네이밍한다.

## 6. 스타일링
- 스타일은 **Tailwind 클래스로만** 작성한다.
- **inline style(`style={{...}}`) 사용 금지.** CSS Modules, styled-components 등 다른 방식도 사용하지 않는다.
- 조건부 클래스는 `cn()` (`@/lib/utils`)을 사용한다. 변형(variant)이 여러 개인 컴포넌트는 `cva`로 정의한다.
- 색상/폰트/반경 등 테마 값은 `app/globals.css`의 `@theme`과 shadcn CSS 변수를 사용한다.
  - 커스텀 컬러: `primary` (#B72818), `sub` (#FFA213)
  - 폰트: `font-pretendard` (body 기본), `font-sans` (Geist)
- 전역 CSS는 `app/globals.css`에만 추가한다. 컴포넌트 단위 스타일을 전역 CSS에 쓰지 않는다.
- 아이콘은 `lucide-react`를 사용한다.

## 7. 상태 관리

### 클라이언트 상태 (zustand)
- 전역 클라이언트 상태는 `stores/`에 `useXxxStore.ts`로 정의한다.
- 스토어는 `create` + `combine` 패턴으로 상태와 액션을 분리하고, 영속화가 필요하면 `persist`를 사용한다 (`partialize`로 저장 대상을 제한한다).
- 컴포넌트에서는 필요한 값만 selector로 구독한다.

```ts
const member = useAuthStore((state) => state.member);
```

### 서버 상태 (TanStack Query)
- 서버 데이터는 zustand에 복사하지 않고 `@tanstack/react-query`(`useQuery`, `useMutation`)로 관리한다.
- `QueryClient`는 `providers/ReactQueryProvider.tsx`에서 생성하며 기본값은 `staleTime` 5분, `refetchOnWindowFocus: false`이다.
- 데이터 요청 함수는 `api/` 폴더에 두고, 컴포넌트/훅에서 `useQuery`로 호출한다.
- Query key는 배열로 작성하고 도메인 단위로 묶는다 (`["user", id]`).

## 8. 폼 (react-hook-form)
- 폼은 `useForm`을 사용하며, 입력 필드는 `register` 또는 `Controller`로 연결한다.
- 폼 컴포넌트는 `"use client"`로 선언한다.
- 폼 제출 시 서버 요청은 `useMutation`으로 처리한다.

## 9. API 호출 규칙
- 모든 요청 함수는 `api/<domain>/<domain>.api.ts`에 작성한다 (`api/user/user.api.ts` 구조 참고).
- 응답이 실패(`!response.ok`)하면 `throw new Error(...)`로 예외를 던진다.
- 백엔드 주소는 `process.env.NEXT_PUBLIC_BACKEND_URL`을 사용한다 (`.env` 참고).
- 인증이 필요한 요청은 `credentials: "include"`를 사용한다.
- 백엔드 응답은 `ApiResponseDTO<T>` (`types/common/common.type.ts`) 형태를 따른다: `{ success, message, data }`.
- 토큰 갱신(401 → refresh → 재요청) 로직은 한 곳(api 계층 또는 공통 함수)에서 처리하고, 컴포넌트마다 복제하지 않는다.

## 10. 타입 규칙
- 타입은 `types/<domain>/<domain>.type.ts`에 정의한다.
- API 응답 타입은 `DTO` 접미사를 사용한다.
- 제네릭 기본값도 `any`를 쓰지 않고 `unknown`을 사용한다.

```ts
export interface ApiResponseDTO<T = unknown> {
    success: boolean;
    message: string;
    data: T | null;
}
```

## 11. 환경 변수
- 브라우저에서 읽는 값만 `NEXT_PUBLIC_` 접두사를 사용한다.
- 비밀 값(API 키, 시크릿)은 `NEXT_PUBLIC_`을 붙이지 않고 서버 컴포넌트/서버 코드에서만 사용한다.
- `.env*` 파일은 커밋하지 않는다 (`.gitignore`).

## 12. 데이터 fetching 위치
- `useEffect()` 안에서 데이터를 fetching하지 않는다. `useQuery`를 사용한다.
- 가능하면 Server Component에서 서버 측 fetching을 한다.

## 13. 절대 하지 말 것
- class component 작성 금지
- inline style 사용 금지
- `any` 타입 사용 금지 (불가피한 경우에만 예외, 사유를 주석으로 남긴다)
- `useEffect()` 안에서 데이터 fetching 금지 (TanStack Query 사용)
- 컴포넌트 파일에 컴포넌트를 2개 이상 정의하거나 export 금지
- 최신 버전으로 강제 업데이트 금지 (현재 버전 유지)
- 기존 폴더 구조 변경 금지 (새 관심사 폴더 추가는 가능)
- 데이터 요청을 컴포넌트 안에 직접 작성 금지 (`api/` 사용)
- 전역 CSS에 컴포넌트 스타일 작성 금지
- 새로운 그룹라우팅 추가 금지, (auth), (public), (protected) 폴더만 사용할 것

## 14. 기존 코드와의 불일치 (정리 대상)

새 코드를 작성할 때는 아래 규칙을 따르고, 기존 코드를 수정할 때 함께 정리한다.

- `components/auth/AuthHydration.tsx`: `useEffect` 안에서 `fetch`로 데이터를 가져온다. TanStack Query 기반으로 전환 대상이다.
- `types/common/common.type.ts`: `ApiResponseDTO<T = any>`는 `unknown`으로 변경 대상이다.
- `stores/useAuthStore.ts`: `@/types/member/member.type`(`MemberDTO`)을 import하지만 해당 파일이 없다. 현재는 `types/user/user.type.ts`만 존재한다.
- `app/comminty/index.tsx`: 라우트 파일이 아니며(`page.tsx` 필요), 함수명이 소문자 `index`다. 라우트 파일명과 PascalCase 규칙에 맞춰 정리 대상이다.
- `posscss.config.mjs`: 파일명 오타로 PostCSS 설정 파일로 인식되지 않을 수 있다. `postcss.config.mjs`로의 변경 여부를 확인한다.
- `components/common/Loading.tsx`, `components/common/ErrorComponent.tsx`: 공통 컴포넌트 위치는 정상이다.



