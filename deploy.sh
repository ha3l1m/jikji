#!/bin/bash
set -e

PROD_URL="https://jikji.ai"
LOCAL_URL="http://localhost:3000"
ENV_FILES=(.env .env.local .env.production .env.development)

restore_env() {
  echo ""
  echo "빌드 실패 — BASE_URL을 localhost로 복원합니다..."
  for f in "${ENV_FILES[@]}"; do
    if [ -f "$f" ]; then
      sed -i "s|BASE_URL=.*|BASE_URL=$LOCAL_URL|g" "$f"
      echo "  복원: $f"
    fi
  done
  exit 1
}

# 1. BASE_URL → 프로덕션으로 변경
echo "==> BASE_URL을 $PROD_URL 로 변경합니다"
for f in "${ENV_FILES[@]}"; do
  if [ -f "$f" ]; then
    sed -i "s|BASE_URL=.*|BASE_URL=$PROD_URL|g" "$f"
    echo "  수정: $f"
  fi
done

# 2. 빌드 (실패 시 자동 복원)
echo ""
echo "==> npm run build"
trap restore_env ERR
npm run build
trap - ERR

# 3-1. 빌드 성공 시 배포
echo ""
echo "==> 빌드 성공! 서버에 배포합니다..."
rsync -avz --delete -e "ssh -i ~/.ssh/homepage.pem" ./out/ ubuntu@15.165.205.147:/home/ubuntu/homepage_jikji/out/

# BASE_URL 복원
echo ""
echo "==> BASE_URL을 $LOCAL_URL 로 복원합니다"
for f in "${ENV_FILES[@]}"; do
  if [ -f "$f" ]; then
    sed -i "s|BASE_URL=.*|BASE_URL=$LOCAL_URL|g" "$f"
    echo "  복원: $f"
  fi
done

echo ""
echo "배포 완료!"
