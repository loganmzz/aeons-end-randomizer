import React, { useCallback } from 'react'

import * as types from '../../../../../types'
import { useModal, usePrompt } from '../../../../../hooks/useModal'

import EditButton from '../../../../molecules/EditButton'
import DeleteButton from '../../../../molecules/DeleteButton'

import ModalBodyWrapper from '../../../../atoms/ModalBodyWrapper'

import CheckboxWithPreview from '../CheckboxWithPreview'
import CustomSetupEdit from '../CustomSetupEdit'
import CheckboxWithPreviewControls from './CheckboxWithPreviewControls'

type Props = {
  setup: types.IMarketSetup
  changeHandler: (id: string) => void
  editSetup: (id: string) => void
  deleteSetup: (id: string) => void
  cancelEdit: (id: string) => void
}

const CustomSetupCheckbox = ({
  setup,
  changeHandler,
  editSetup,
  deleteSetup,
  cancelEdit,
}: Props) => {
  const {
    show: showEditModal,
    hide: hideEditModal,
    RenderModal: RenderEditModal,
  } = useModal()
  const {
    show: showDeletionDialog,
    hide: hideDeletionDialog,
    RenderPrompt: RenderDeletionPrompt,
  } = usePrompt()
  const modalTitle = 'Edit Setup'

  const handleEdit = useCallback(() => {
    showEditModal()
    editSetup(setup.id)
  }, [setup.id, showEditModal, editSetup])

  const handleEditCancel = useCallback(() => cancelEdit(setup.id), [
    cancelEdit,
    setup.id,
  ])

  const openDeletionDialog = useCallback(() => {
    showDeletionDialog()
  }, [showDeletionDialog])

  const handleDelete = useCallback(() => {
    deleteSetup(setup.id)
    hideDeletionDialog()
  }, [setup.id, deleteSetup, hideDeletionDialog])

  return (
    <CheckboxWithPreview setup={setup} changeHandler={changeHandler}>
      <CheckboxWithPreviewControls>
        <EditButton onClick={handleEdit} />
        <DeleteButton onClick={openDeletionDialog} />
      </CheckboxWithPreviewControls>
      <RenderEditModal
        titleColor="#333"
        titleLabel={modalTitle}
        closeCallback={handleEditCancel}
      >
        <ModalBodyWrapper>
          <CustomSetupEdit setup={setup} saveCallback={hideEditModal} />
        </ModalBodyWrapper>
      </RenderEditModal>
      <RenderDeletionPrompt
        yesHandler={handleDelete}
        noHandler={hideDeletionDialog}
        titleColor="#333"
        titleLabel="Delete Setup"
      >
        <p>Would you really like to delete setup: "{setup.name}"?</p>
      </RenderDeletionPrompt>
    </CheckboxWithPreview>
  )
}

export default React.memo(CustomSetupCheckbox)
