#!/usr/bin/env sh

# vars
SRC_DIR=./src
PATTERNS_FILE=${SRC_DIR}/patterns.json
ALLOWED_FILE=${SRC_DIR}/allowed.json
BUILD_DIR=./build
JSON_FILE=${BUILD_DIR}/regexes.json
GITSECRETS_FILE=${BUILD_DIR}/git-secrets-add.sh
GITHOUND_FILE=${BUILD_DIR}/.githound.yml

# Setup
cp ${PATTERNS_FILE} ${JSON_FILE}

## git-secrets
cat <<EOF > ${GITSECRETS_FILE}
#!/usr/bin/env sh
EOF

add_gitsecrets() {
  case $1 in
    allowed)
      echo "git secrets --add -a '${2//\'/''}'" >> ${GITSECRETS_FILE}
      ;;
    *)
      echo "git secrets --add '${1//\'/''}'" >> ${GITSECRETS_FILE}
      ;;
  esac
}

## gitHound
cat <<EOF > ${GITHOUND_FILE}
fail:
EOF

add_githound() {
  # TODO have to convert regex flavour?

  case $1 in
    allowed)
      # TODO add to warn?
      #echo "  - '${2//\'/''}'" >> ${GITHOUND_FILE}
      ;;
    *)
      echo "  - '${1//\'/''}'" >> ${GITHOUND_FILE}
      ;;
  esac
}

# Common patterns for replacement
. ${SRC_DIR}/common

# Replace - TODO refactor
TMP=$(cat ${JSON_FILE})
TMP=${TMP//\$\{quote\}/${quote}}
TMP=${TMP//\$\{opt_quote\}/${opt_quote}}
TMP=${TMP//\$\{space\}/${space}}
TMP=${TMP//\$\{opt_space\}/${opt_space}}
TMP=${TMP//\$\{connect\}/${connect}}
echo ${TMP} > ${JSON_FILE}

# Build plugins
## Prohibited Rules
while IFS='=' read -r name value; do
  add_gitsecrets "${value}"
  add_githound "${value}"
done <<EOF
$(jq -r '. | keys[] as $k | "\($k)=\(.[$k])"' ${JSON_FILE})
EOF

## Allowed Rules
while IFS='=' read -r name value; do
  add_gitsecrets "allowed" "${value}"
  add_githound "allowed" "${value}"
done <<EOF
$(jq -r '. | keys[] as $k | "\($k)=\(.[$k])"' ${ALLOWED_FILE})
EOF

