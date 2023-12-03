import { UserSandboxScript } from "@/comp/atom"
import { faBookmark, faEdit, faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from 'moment'

interface ScriptInfoProps {
  script: UserSandboxScript
}

const ScriptInfo = (props: ScriptInfoProps) => {
  const {
    script,
  } = props

  const formattedUpdatedAt = moment(script.updatedAt).format('MMM. Do, YY\'')

  return (
    <div className="absolute bottom-10 left-10 bg-[#201B31] p-5 rounded-md w-[400px] flex-col gap-1.5 flex">
      <div className="flex justify-between">
        <div className="bold">{script.name}</div>

        <FontAwesomeIcon className="mx-2 text-slate-500 " icon={faPencil} />
      </div>

      <div className="font-thin">
        {script.description}
      </div>

      <div className="font-thin text-sm">
        last updated <b>{formattedUpdatedAt}</b>
      </div>
    </div>
  )
}

export default ScriptInfo
